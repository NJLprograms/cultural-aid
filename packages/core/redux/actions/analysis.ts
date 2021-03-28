export const IMAGE_ANALYZED_SUCCESS =
  '[Image Analysis] Image Analysis Successful';
export const IMAGE_ANALYZED_REQUEST =
  '[Image Analysis] Image Analysis Requested';
export const IMAGE_ANALYZED_ERROR = '[Image Analysis] Image Analysis Error';

export class ImageAnalysisSuccessAction {
  readonly type = IMAGE_ANALYZED_SUCCESS;
  constructor(readonly payload: any) {}
}

export class ImageAnalysisRequestAction {
  readonly type = IMAGE_ANALYZED_REQUEST;
  constructor(readonly payload: File) {}
}

export class ImageAnalysisErrorAction {
  readonly type = IMAGE_ANALYZED_ERROR;
  constructor(readonly payload: Error) {}
}

export type ImageAnalysisActions =
  | ImageAnalysisSuccessAction
  | ImageAnalysisRequestAction
  | ImageAnalysisErrorAction;
