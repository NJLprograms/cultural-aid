export const RESET_PASSWORD_REQUEST = '[Process] Rest Password Email Request';
export const RESET_PASSWORD_SUCCESS =
  '[Process] Reset Password Email Request Successful';
export const RESET_PASSWORD_ERROR =
  '[Process] Reset Password Email Request Error';

export class ResetPasswordRequestAction {
  readonly type = RESET_PASSWORD_REQUEST;
  constructor(readonly payload: string) {}
}

export class ResetPasswordSuccessAction {
  readonly type = RESET_PASSWORD_SUCCESS;
}

export class ResetPasswordErrorAction {
  readonly type = RESET_PASSWORD_ERROR;
  constructor(readonly payload: Error) {}
}

export type ProcessActions =
  | ResetPasswordSuccessAction
  | ResetPasswordErrorAction
  | ResetPasswordRequestAction;
