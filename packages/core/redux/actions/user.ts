import { User } from '@cultural-aid/types/user';

export const LOGIN_SUCCESS = '[User] Login Success';
export const SIGN_UP_SUCCESS = '[User] Sign Up Success';
export const LOGOUT_SUCCESS = '[User] Logout Success';

export const PROCESS_STATE_LOGIN = '[User] Login Processing';
export const PROCESS_STATE_SIGN_UP = '[User] Sign Up Processing';
export const PROCESS_STATE_LOGOUT = '[User] Logout Processing';

export const LOGIN_ERROR = '[User] Login Error';
export const SIGN_UP_ERROR = '[User] Sign Up Error';
export const LOGOUT_ERROR = '[User] Logout Error';

export const USER_DETECTED_ACTION = '[User] Logged In User Detected';

export type UserCredentials = {
  email: string;
  password: string;
};

// Success

export class UserLoginSuccess {
  readonly type = LOGIN_SUCCESS;
  constructor(readonly payload: User) {}
}

export class UserSignUpSuccess {
  readonly type = SIGN_UP_SUCCESS;
  constructor(readonly payload: User) {}
}

export class UserLogoutSuccess {
  readonly type = LOGOUT_SUCCESS;
}

// Processing

export class ProcessUserLoginAction {
  readonly type = PROCESS_STATE_LOGIN;
  constructor(readonly payload: UserCredentials) {}
}

export class ProcessUserLogoutAction {
  readonly type = PROCESS_STATE_LOGOUT;
}

export class ProcessUserSignUpAction {
  readonly type = PROCESS_STATE_SIGN_UP;
  constructor(readonly payload: UserCredentials) {}
}

// Errors

export class LoginErrorAction {
  readonly type = LOGIN_ERROR;
  constructor(readonly payload: Error) {}
}

export class SignupErrorAction {
  readonly type = SIGN_UP_ERROR;
  constructor(readonly payload: Error) {}
}

export class LogoutErrorAction {
  readonly type = LOGOUT_ERROR;
  constructor(readonly payload: Error) {}
}

// Other

export class UserDetectedAction {
  readonly type = USER_DETECTED_ACTION;
  constructor(readonly payload: User) {}
}

export type UserActions =
  | UserLoginSuccess
  | UserSignUpSuccess
  | UserLogoutSuccess
  | ProcessUserLoginAction
  | ProcessUserLogoutAction
  | ProcessUserSignUpAction
  | LoginErrorAction
  | SignupErrorAction
  | LogoutErrorAction
  | UserDetectedAction;
