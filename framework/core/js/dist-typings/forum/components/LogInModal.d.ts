import FormModal, { IFormModalAttrs } from '../../common/components/FormModal';
import ItemList from '../../common/utils/ItemList';
import Stream from '../../common/utils/Stream';
import type Mithril from 'mithril';
import RequestError from '../../common/utils/RequestError';
import type { LoginParams } from '../../common/Session';
export interface ILoginModalAttrs extends IFormModalAttrs {
    identification?: string;
    password?: string;
    remember?: boolean;
}
export default class LogInModal<CustomAttrs extends ILoginModalAttrs = ILoginModalAttrs> extends FormModal<CustomAttrs> {
    /**
     * The value of the identification input.
     */
    identification: Stream<string>;
    /**
     * The value of the password input.
     */
    password: Stream<string>;
    /**
     * The value of the remember me input.
     */
    remember: Stream<boolean>;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element[];
    body(): JSX.Element[];
    fields(): ItemList<unknown>;
    footer(): JSX.Element;
    /**
     * Open the forgot password modal, prefilling it with an email if the user has
     * entered one.
     */
    forgotPassword(): void;
    /**
     * Open the sign up modal, prefilling it with an email/username/password if
     * the user has entered one.
     */
    signUp(): void;
    onready(): void;
    onsubmit(e: SubmitEvent): void;
    loginParams(): LoginParams;
    onerror(error: RequestError): void;
}
