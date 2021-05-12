import { Epic, StateObservable, combineEpics, ofType } from 'redux-observable';
import {
  LoginErrorAction,
  LogoutErrorAction,
  PROCESS_STATE_GOOGLE_SIGN_IN,
  PROCESS_STATE_LOGIN,
  PROCESS_STATE_LOGOUT,
  PROCESS_STATE_SIGN_UP,
  ProcessGoogleSignInAction,
  ProcessUserLoginAction,
  ProcessUserLogoutAction,
  ProcessUserSignUpAction,
  SignupErrorAction,
  UserLoginSuccess,
  UserLogoutSuccess,
  UserSignUpSuccess,
} from '@cultural-aid/core/redux/actions/user';
import { Observable, from, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  pluck,
  switchAll,
  switchMap,
} from 'rxjs/operators';

import { AppState } from '@cultural-aid/core/redux';
import { ImageAnalysisStateResetAction } from '../../actions/analysis';
import { ResetProcessStateAction } from '../../actions/process';
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
    switchMap((_action: ProcessUserLogoutAction) =>
      from(firebase.auth().signOut()).pipe(
        mergeMap(() =>
          of([
            new UserLogoutSuccess(),
            new ResetProcessStateAction(),
            new ImageAnalysisStateResetAction(),
          ]).pipe(switchAll())
        ),
        catchError(
          (error: Error): Observable<LogoutErrorAction> =>
            of(new LogoutErrorAction(error))
        )
      )
    )
  );

const googleSignInEpic = (
  action$: Observable<ProcessGoogleSignInAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(PROCESS_STATE_GOOGLE_SIGN_IN),
    switchMap((_action: ProcessGoogleSignInAction) =>
      from(
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      ).pipe(
        map(
          ({ user }: firebase.default.auth.UserCredential) =>
            new UserLoginSuccess(user)
        ),
        catchError((error) => of(new LoginErrorAction(error)))
      )
    )
  );

export const userEpic = combineEpics(
  userLoginEpic,
  userSignUpEpic,
  userLogoutEpic,
  googleSignInEpic
);
