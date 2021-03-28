import { Epic, StateObservable, combineEpics, ofType } from 'redux-observable';
import {
  LoginErrorAction,
  LogoutErrorAction,
  PROCESS_STATE_LOGIN,
  PROCESS_STATE_LOGOUT,
  PROCESS_STATE_SIGN_UP,
  ProcessUserLoginAction,
  ProcessUserLogoutAction,
  ProcessUserSignUpAction,
  SignupErrorAction,
  UserLoginSuccess,
  UserLogoutSuccess,
  UserSignUpSuccess,
} from '@cultural-aid/core/redux/actions/user';
import { Observable, from, of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';

import { AppState } from '@cultural-aid/core/redux';
import type { User } from '@cultural-aid/types/user';
import { firebase } from '@cultural-aid/core/firebase';

const userLoginEpic: Epic = (
  action$: Observable<ProcessUserLoginAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(PROCESS_STATE_LOGIN),
    switchMap((action: ProcessUserLoginAction) =>
      from(
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() =>
            firebase
              .auth()
              .signInWithEmailAndPassword(
                action.payload.email,
                action.payload.password
              )
          )
      ).pipe(
        pluck('user'),
        map((user: User) => new UserLoginSuccess(user)),
        catchError(
          (error: Error): Observable<LoginErrorAction> =>
            of(new LoginErrorAction(error))
        )
      )
    )
  );

const userSignUpEpic: Epic = (
  action$: Observable<ProcessUserSignUpAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(PROCESS_STATE_SIGN_UP),
    switchMap((action: ProcessUserSignUpAction) =>
      from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            action.payload.email,
            action.payload.password
          )
      ).pipe(
        pluck('user'),
        map((user: User) => new UserSignUpSuccess(user)),
        catchError(
          (error: Error): Observable<SignupErrorAction> =>
            of(new SignupErrorAction(error))
        )
      )
    )
  );

const userLogoutEpic = (
  action$: Observable<ProcessUserLogoutAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(PROCESS_STATE_LOGOUT),
    switchMap((action: ProcessUserLogoutAction) =>
      from(firebase.auth().signOut()).pipe(
        map(() => new UserLogoutSuccess()),
        catchError(
          (error: Error): Observable<LogoutErrorAction> =>
            of(new LogoutErrorAction(error))
        )
      )
    )
  );

export const userEpic = combineEpics(
  userLoginEpic,
  userSignUpEpic,
  userLogoutEpic
);
