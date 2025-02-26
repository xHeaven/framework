import Mithril from 'mithril';

import app from '../../admin/app';

import LoadingIndicator from '../../common/components/LoadingIndicator';
import Button from '../../common/components/Button';

import listItems from '../../common/helpers/listItems';

import type User from '../../common/models/User';
import type { IPageAttrs } from '../../common/components/Page';

import ItemList from '../../common/utils/ItemList';
import classList from '../../common/utils/classList';
import extractText from '../../common/utils/extractText';
import AdminPage from './AdminPage';
import { debounce } from '../../common/utils/throttleDebounce';
import CreateUserModal from './CreateUserModal';
import Icon from '../../common/components/Icon';
import Input from '../../common/components/Input';
import GambitsAutocompleteDropdown from '../../common/components/GambitsAutocompleteDropdown';
import Pagination from '../../common/components/Pagination';

type ColumnData = {
  /**
   * Column title
   */
  name: Mithril.Children;
  /**
   * Component(s) to show for this column.
   */
  content: (user: User) => Mithril.Children;
};

/**
 * Admin page which displays a paginated list of all users on the forum.
 */
export default class UserListPage extends AdminPage {
  private query: string = '';
  private throttledSearch = debounce(250, () => this.loadPage(0));

  /**
   * Number of users to load per page.
   */
  private numPerPage: number = 50;

  /**
   * Current page number. Zero-indexed.
   */
  private pageNumber: number = 0;

  /**
   * Page number being loaded. Zero-indexed.
   */
  private loadingPageNumber: number = 0;

  /**
   * Total number of forum users.
   *
   * Fetched from the active `AdminApplication` (`app`), with
   * data provided by `AdminPayload.php`, or `flarum/statistics`
   * if installed.
   */
  readonly userCount: number = app.data.modelStatistics.users.total;

  /**
   * Get total number of user pages.
   */
  private getTotalPageCount(): number {
    if (this.userCount === -1) return 0;

    return Math.ceil(this.userCount / this.numPerPage);
  }

  /**
   * This page's array of users.
   *
   * `undefined` when page loads as no data has been fetched.
   */
  private pageData: User[] | undefined = undefined;

  private isLoadingPage: boolean = false;

  oninit(vnode: Mithril.Vnode<IPageAttrs, this>) {
    super.oninit(vnode);

    // Get page query value from URL
    const page = parseInt(m.route.param('page'));

    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }

    this.loadingPageNumber = this.pageNumber;
  }

  /**
   * Component to render.
   */
  content() {
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);

      return [
        <section className="UserListPage-grid UserListPage-grid--loading">
          <LoadingIndicator containerClassName="LoadingIndicator--block" size="large" />
        </section>,
      ];
    }

    const columns = this.columns().toArray();

    return [
      <div className="UserListPage-header">{this.headerItems().toArray()}</div>,
      <section
        className={classList(['UserListPage-grid', this.isLoadingPage ? 'UserListPage-grid--loadingPage' : 'UserListPage-grid--loaded'])}
        style={{ '--columns': columns.length }}
        role="table"
        // +1 to account for header
        aria-rowcount={this.pageData.length + 1}
        aria-colcount={columns.length}
        aria-live="polite"
        aria-busy={this.isLoadingPage ? 'true' : 'false'}
      >
        {/* Render columns */}
        {columns.map((column, colIndex) => (
          <div className="UserListPage-grid-header" role="columnheader" aria-colindex={colIndex + 1} aria-rowindex={1}>
            {column.name}
          </div>
        ))}

        {/* Render user data */}
        {this.pageData.map((user, rowIndex) =>
          columns.map((col, colIndex) => {
            const columnContent = col.content && col.content(user);

            return (
              <div
                className={classList(['UserListPage-grid-rowItem', rowIndex % 2 > 0 && 'UserListPage-grid-rowItem--shaded'])}
                data-user-id={user.id()}
                data-column-name={col.itemName}
                aria-colindex={colIndex + 1}
                // +2 to account for 0-based index, and for the header row
                aria-rowindex={rowIndex + 2}
                role="cell"
              >
                {columnContent || app.translator.trans('core.admin.users.grid.invalid_column_content')}
              </div>
            );
          })
        )}

        {/* Loading spinner that shows when a new page is being loaded */}
        {this.isLoadingPage && <LoadingIndicator size="large" />}
      </section>,
      <Pagination
        currentPage={this.pageNumber + 1}
        loadingPageNumber={this.loadingPageNumber + 1}
        total={this.userCount}
        perPage={this.numPerPage}
        onChange={this.goToPage.bind(this)}
      />,
    ];
  }

  headerItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    const onchange = (value: string) => {
      this.isLoadingPage = true;
      this.query = value;
      this.throttledSearch();
    };

    items.add(
      'search',
      <GambitsAutocompleteDropdown resource="users" query={this.query} onchange={onchange}>
        <Input
          type="search"
          placeholder={app.translator.trans('core.admin.users.search_placeholder')}
          clearable={true}
          loading={this.isLoadingPage}
          value={this.query}
          onchange={onchange}
        />
      </GambitsAutocompleteDropdown>,
      100
    );

    items.add(
      'totalUsers',
      <p class="UserListPage-totalUsers">{app.translator.trans('core.admin.users.total_users', { count: this.userCount })}</p>,
      90
    );

    items.add('actions', <div className="UserListPage-actions">{this.actionItems().toArray()}</div>, 80);

    return items;
  }

  actionItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'createUser',
      <Button className="Button UserListPage-createUserBtn" icon="fas fa-user-plus" onclick={() => app.modal.show(CreateUserModal)}>
        {app.translator.trans('core.admin.users.create_user_button')}
      </Button>,
      100
    );

    return items;
  }

  /**
   * Build an item list of columns to show for each user.
   *
   * Each column in the list should be an object with keys `name` and `content`.
   *
   * `name` is a string that will be used as the column name.
   * `content` is a function with the User model passed as the first and only argument.
   *
   * See `UserListPage.tsx` for examples.
   */
  columns(): ItemList<ColumnData> {
    const columns = new ItemList<ColumnData>();

    columns.add(
      'id',
      {
        name: app.translator.trans('core.admin.users.grid.columns.user_id.title'),
        content: (user: User) => user.id() ?? null,
      },
      100
    );

    columns.add(
      'username',
      {
        name: app.translator.trans('core.admin.users.grid.columns.username.title'),
        content: (user: User) => {
          const profileUrl = `${app.forum.attribute('baseUrl')}/u/${user.slug()}`;

          return (
            <a
              target="_blank"
              href={profileUrl}
              title={extractText(app.translator.trans('core.admin.users.grid.columns.username.profile_link_tooltip', { username: user.username() }))}
            >
              {user.username()}
            </a>
          );
        },
      },
      90
    );

    columns.add(
      'displayName',
      {
        name: app.translator.trans('core.admin.users.grid.columns.display_name.title'),
        content: (user: User) => user.displayName(),
      },
      85
    );

    columns.add(
      'joinDate',
      {
        name: app.translator.trans('core.admin.users.grid.columns.join_time.title'),
        content: (user: User) => (
          <span className="UserList-joinDate" title={user.joinTime()}>
            {app.translator.formatDateTime(dayjs(user.joinTime()), 'core.lib.datetime_formats.userListJoinDate')}
          </span>
        ),
      },
      80
    );

    columns.add(
      'groupBadges',
      {
        name: app.translator.trans('core.admin.users.grid.columns.group_badges.title'),
        content: (user: User) => {
          const badges = user.badges().toArray();

          if (badges.length) {
            return <ul className="DiscussionHero-badges badges">{listItems(badges)}</ul>;
          } else {
            return app.translator.trans('core.admin.users.grid.columns.group_badges.no_badges');
          }
        },
      },
      70
    );

    columns.add(
      'emailAddress',
      {
        name: app.translator.trans('core.admin.users.grid.columns.email.title'),
        content: (user: User) => {
          function setEmailVisibility(visible: boolean) {
            // Get needed jQuery element refs
            const emailContainer = $(`[data-column-name=emailAddress][data-user-id=${user.id()}] .UserList-email`);
            const emailAddress = emailContainer.find('.UserList-emailAddress');
            const emailToggleButton = emailContainer.find('.UserList-emailIconBtn');
            const emailToggleButtonIcon = emailToggleButton.find('.icon');

            emailToggleButton.attr(
              'title',
              extractText(
                visible
                  ? app.translator.trans('core.admin.users.grid.columns.email.visibility_hide')
                  : app.translator.trans('core.admin.users.grid.columns.email.visibility_show')
              )
            );

            emailAddress.attr('aria-hidden', visible ? null : 'true');

            if (visible) {
              emailToggleButtonIcon.addClass('fa-eye');
              emailToggleButtonIcon.removeClass('fa-eye-slash');
            } else {
              emailToggleButtonIcon.removeClass('fa-eye');
              emailToggleButtonIcon.addClass('fa-eye-slash');
            }

            // Need the string interpolation to prevent TS error.
            emailContainer.attr('data-email-shown', `${visible}`);
          }

          function toggleEmailVisibility() {
            const emailContainer = $(`[data-column-name=emailAddress][data-user-id=${user.id()}] .UserList-email`);
            const emailShown = emailContainer.attr('data-email-shown') === 'true';

            if (emailShown) {
              setEmailVisibility(false);
            } else {
              setEmailVisibility(true);
            }
          }

          return (
            <div className="UserList-email" key={user.id()} data-email-shown="false">
              <span className="UserList-emailAddress" aria-hidden="true" onclick={() => setEmailVisibility(true)}>
                {user.email()}
              </span>
              <button
                onclick={toggleEmailVisibility}
                className="Button Button--text UserList-emailIconBtn"
                title={app.translator.trans('core.admin.users.grid.columns.email.visibility_show')}
              >
                <Icon name="far fa-eye-slash fa-fw" className="icon" />
              </button>
            </div>
          );
        },
      },
      70
    );

    columns.add(
      'editUser',
      {
        name: app.translator.trans('core.admin.users.grid.columns.edit_user.title'),
        content: (user: User) => (
          <Button
            className="Button UserList-editModalBtn"
            title={app.translator.trans('core.admin.users.grid.columns.edit_user.tooltip', { username: user.username() })}
            onclick={() => app.modal.show(() => import('../../common/components/EditUserModal'), { user })}
          >
            {app.translator.trans('core.admin.users.grid.columns.edit_user.button')}
          </Button>
        ),
      },
      -90
    );

    return columns;
  }

  headerInfo() {
    return {
      className: 'UserListPage',
      icon: 'fas fa-users',
      title: app.translator.trans('core.admin.users.title'),
      description: app.translator.trans('core.admin.users.description'),
    };
  }

  /**
   * Asynchronously fetch the next set of users to be rendered.
   *
   * Returns an array of Users, plus the raw API payload.
   *
   * Uses the `this.numPerPage` as the response limit, and automatically calculates the offset required from `pageNumber`.
   *
   * @param pageNumber The **zero-based** page number to load and display
   */
  async loadPage(pageNumber: number) {
    if (pageNumber < 0) pageNumber = 0;

    this.loadingPageNumber = pageNumber;
    this.setPageNumberInUrl(pageNumber + 1);

    app.store
      .find<User[]>('users', {
        filter: { q: this.query },
        page: {
          limit: this.numPerPage,
          offset: pageNumber * this.numPerPage,
        },
      })
      .then((apiData) => {
        let data = apiData;

        // @ts-ignore
        delete data.payload;

        const lastPage = this.getTotalPageCount();

        if (pageNumber > lastPage) {
          this.loadPage(lastPage - 1);
        } else {
          this.pageData = data;
          this.pageNumber = pageNumber;
          this.loadingPageNumber = pageNumber;
          this.isLoadingPage = false;
        }

        m.redraw();
      })
      .catch((err: Error) => {
        console.error(err);
        this.pageData = [];
      });
  }

  /**
   * @param page The **1-based** page number
   */
  goToPage(page: number) {
    this.isLoadingPage = true;
    this.loadPage(page - 1);
  }

  private setPageNumberInUrl(pageNumber: number) {
    const search = window.location.hash.split('?', 2);
    const params = new URLSearchParams(search?.[1] ?? '');

    params.set('page', `${pageNumber}`);
    // window.location.hash = search?.[0] + '?' + params.toString();
    window.history.replaceState(null, '', search?.[0] + '?' + params.toString());
  }
}
