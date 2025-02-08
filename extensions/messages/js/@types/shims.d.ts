import type Dialog from '../common/models/Dialog';
import DialogListState from '../forum/states/DialogListState';

declare module 'flarum/forum/routes' {
  export interface ForumRoutes {
    dialog: (dialog: Dialog, near?: number) => string;
  }
}

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    dialogs: DialogListState;
    dropdownDialogs: DialogListState;
  }
}

declare module 'flarum/forum/states/ComposerState' {
  export default interface ComposerState {
    composingMessageTo(dialog: Dialog): boolean;
  }
}

declare module 'flarum/common/models/User' {
  export default interface User {
    canSendAnyMessage(): boolean;
  }
}
