import { Epic, StateObservable, combineEpics, ofType } from 'redux-observable';
import {
  IMAGE_ANALYSIS_IN_PROGRESS,
  IMAGE_ANALYZED_REQUEST,
  ImageAnalysisErrorAction,
  ImageAnalysisInProgressAction,
  ImageAnalysisRequestAction,
  ImageAnalysisSuccessAction,
} from '@cultural-aid/core/redux/actions/analysis';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AppState } from '@cultural-aid/core/redux';
import { BucketPutResult } from '@cultural-aid/types/storage';
import { FirebaseService } from '@cultural-aid/core/services/firebase';
import { HttpService } from '@cultural-aid/core/services/http';
import { ImageAnalysisResults } from '@cultural-aid/types';

const uploadImageEpic: Epic = (
  action$: Observable<ImageAnalysisRequestAction>,
  _store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(IMAGE_ANALYZED_REQUEST),
    switchMap(({ payload }: ImageAnalysisRequestAction) =>
      from(FirebaseService.Storage.put(payload)).pipe(
        map(
          (putResult: BucketPutResult) =>
            new ImageAnalysisInProgressAction(putResult)
        ),
        catchError((error: Error) => of(new ImageAnalysisErrorAction(error)))
      )
    )
  );

const analyzeImageEpic: Epic = (
  action$: Observable<ImageAnalysisInProgressAction>,
  store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(IMAGE_ANALYSIS_IN_PROGRESS),
    switchMap(({ payload: bucketObject }: ImageAnalysisInProgressAction) =>
      from(
        HttpService.post<ImageAnalysisResults>('/api/process-file', {
          body: JSON.stringify({
            bucketObject,
            userId: store$.value.user.value.uid,
          }),
        })
      ).pipe(
        map(
          (results: ImageAnalysisResults) =>
            new ImageAnalysisSuccessAction(results)
        ),
        catchError((error: Error) => of(new ImageAnalysisErrorAction(error)))
      )
    )
  );

export const imageAnalysisEpic = combineEpics(
  analyzeImageEpic,
  uploadImageEpic
);
