import { Epic, StateObservable, combineEpics, ofType } from 'redux-observable';
import {
  IMAGE_ANALYZED_REQUEST,
  ImageAnalysisErrorAction,
  ImageAnalysisRequestAction,
  ImageAnalysisSuccessAction,
} from '@cultural-aid/core/redux/actions/analysis';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AppState } from '@cultural-aid/core/redux';
import { BucketPutResult } from '@cultural-aid/types/storage';
import { FirebaseService } from '@cultural-aid/core/services/firebase';
import { HttpService } from '@cultural-aid/core/services/http';

const analyzeImageEpic: Epic = (
  action$: Observable<ImageAnalysisRequestAction>,
  store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(IMAGE_ANALYZED_REQUEST),
    switchMap((action: ImageAnalysisRequestAction) =>
      from(FirebaseService.Storage.put(action.payload)).pipe(
        switchMap((bucketObject: BucketPutResult) =>
          from(
            HttpService.post('/api/process-file', {
              body: JSON.stringify({
                bucketObject,
                userId: store$.value.user.value.uid,
              }),
            })
          ).pipe(
            map((analysis) => new ImageAnalysisSuccessAction(analysis)),
            catchError(
              (error: Error): Observable<ImageAnalysisErrorAction> =>
                of(new ImageAnalysisErrorAction(error))
            )
          )
        ),
        catchError(
          (error: Error): Observable<ImageAnalysisErrorAction> =>
            of(new ImageAnalysisErrorAction(error))
        )
      )
    )
  );

export const imageAnalysisEpic = combineEpics(analyzeImageEpic);
