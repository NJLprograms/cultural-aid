import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import { analysis, process, user } from '@cultural-aid/core/redux/reducers';

import type { ILoadingState } from '@cultural-aid/types/loader-state';
import { ProcessState } from '@cultural-aid/types/process';
import { StoreActions } from '@cultural-aid/core/redux/actions';
import type { User } from '@cultural-aid/types/user';
import { classToJsObject } from '@cultural-aid/core/redux/middlewares/classToJsObject';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '@cultural-aid/core/redux/middlewares/epics';

export type AppState = {
  user: ILoadingState<User>;
  process: ProcessState;
  analysis;
};

export const epicMiddleware = createEpicMiddleware<
  StoreActions,
  StoreActions,
  AppState,
  any
>();

export const store: Store<AppState, StoreActions> = createStore<
  AppState,
  StoreActions,
  any,
  any
>(
  combineReducers({ user, process, analysis }),
  composeWithDevTools(applyMiddleware(epicMiddleware, classToJsObject))
);

export const configureEpic = () => {
  epicMiddleware.run(rootEpic);
};
