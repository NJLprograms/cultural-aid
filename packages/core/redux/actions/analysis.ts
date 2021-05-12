import { BucketPutResult, ImageAnalysisResults } from '@cultural-aid/types';

export const IMAGE_ANALYZED_SUCCESS =
  '[Image Analysis] Image Analysis Successful';
export const IMAGE_ANALYZED_REQUEST =
  '[Image Analysis] Image Analysis Requested';
export const IMAGE_ANALYSIS_IN_PROGRESS =
  '[Image Analysis] Image Analysis In Progress';
export const IMAGE_ANALYZED_ERROR = '[Image Analysis] Image Analysis Error';
export const IMAGE_ANALYSIS_RESET = '[Image Analysis] Reset State';

export class ImageAnalysisSuccessAction {
  readonly type = IMAGE_ANALYZED_SUCCESS;
  constructor(readonly payload: ImageAnalysisResults) {}
}

export class ImageAnalysisRequestAction {
  readonly type = IMAGE_ANALYZED_REQUEST;
  readonly loadingMessage = 'Uploading file to storage for analysis...';
  constructor(readonly payload: File) {}
}

export class ImageAnalysisInProgressAction {
  readonly type = IMAGE_ANALYSIS_IN_PROGRESS;
  readonly loadingMessage = 'Analyzing Image...';
  constructor(readonly payload: BucketPutResult) {}
}

export class ImageAnalysisErrorAction {
  readonly type = IMAGE_ANALYZED_ERROR;
  constructor(readonly payload: Error) {}
}

export class ImageAnalysisStateResetAction {
  readonly type = IMAGE_ANALYSIS_RESET;
}

export type ImageAnalysisActions =
  | ImageAnalysisSuccessAction
  | ImageAnalysisRequestAction
  | ImageAnalysisInProgressAction
  | ImageAnalysisErrorAction
  | ImageAnalysisStateResetAction;
