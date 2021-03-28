import { ILoadingState, LoaderState } from '@cultural-aid/types/loader-state';
import {
  IMAGE_ANALYZED_ERROR,
  IMAGE_ANALYZED_REQUEST,
  IMAGE_ANALYZED_SUCCESS,
  ImageAnalysisActions,
} from '../actions/analysis';

const initialState: ILoadingState<any> = new LoaderState(null);

export const analysis = (
  state: ILoadingState<any> = initialState,
  action: ImageAnalysisActions
): ILoadingState<any> => {
  switch (action.type) {
    case IMAGE_ANALYZED_SUCCESS: {
      return { ...state, loading: false, value: action.payload };
    }
    case IMAGE_ANALYZED_REQUEST: {
      return { ...state, loading: true };
    }
    case IMAGE_ANALYZED_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
