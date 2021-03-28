import {
  ProcessUserLoginAction,
  ProcessUserLogoutAction,
  ProcessUserSignUpAction,
  UserCredentials,
} from '../../redux/actions/user';

import { ResetPasswordRequestAction } from '../../redux/actions/process';
import { store } from '@cultural-aid/core/redux';

export class UserService {
  static Login(userCredentials: UserCredentials) {
    store.dispatch(new ProcessUserLoginAction(userCredentials));
  }

  static SignUp(userCredentials: UserCredentials) {
    store.dispatch(new ProcessUserSignUpAction(userCredentials));
  }

  static SendResetPasswordEmail(email: string) {
    store.dispatch(new ResetPasswordRequestAction(email));
  }

  static Logout() {
    store.dispatch(new ProcessUserLogoutAction());
  }
}
