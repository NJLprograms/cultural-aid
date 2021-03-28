import { Epic, StateObservable, combineEpics, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import {
  RESET_PASSWORD_REQUEST,
  ResetPasswordErrorAction,
  ResetPasswordRequestAction,
  ResetPasswordSuccessAction,
} from '@cultural-aid/core/redux/actions/process';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AppState } from '@cultural-aid/core/redux';
import { firebase } from '@cultural-aid/core/firebase';

const resetPasswordEpic: Epic = (
  action$: Observable<ResetPasswordRequestAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(RESET_PASSWORD_REQUEST),
    switchMap((action: ResetPasswordRequestAction) =>
      from(firebase.auth().sendPasswordResetEmail(action.payload)).pipe(
        map(() => new ResetPasswordSuccessAction()),
        catchError((error: Error) => of(new ResetPasswordErrorAction(error)))
      )
    )
  );

export const processEpic = combineEpics(resetPasswordEpic);
