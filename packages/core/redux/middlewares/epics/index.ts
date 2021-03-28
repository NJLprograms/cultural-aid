import {
  ActionsObservable,
  Epic,
  StateObservable,
  combineEpics,
} from 'redux-observable';

import { AppState } from '@cultural-aid/core/redux';
import { Observable } from 'rxjs';
import type { StoreActions } from '@cultural-aid/core/redux/actions';
import { catchError } from 'rxjs/operators';
import { imageAnalysisEpic } from '@cultural-aid/core/redux/middlewares/epics/analysis';
import { processEpic } from '@cultural-aid/core/redux/middlewares/epics/process';
import { userEpic } from '@cultural-aid/core/redux/middlewares/epics/user';

export const rootEpic: Epic<StoreActions, StoreActions, AppState, any> = (
  action$: ActionsObservable<StoreActions>,
  state$: StateObservable<AppState>,
  dependencies
) =>
  combineEpics(userEpic, processEpic, imageAnalysisEpic)(
    action$,
    state$,
    dependencies
  ).pipe(
    catchError((error: any, source: Observable<any>) => {
      console.error(error);
      return source;
    })
  );
