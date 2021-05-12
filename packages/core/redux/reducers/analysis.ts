import {
  DetailedLoaderState,
  IDetailedLoadingState,
  ILoadingState,
  LoaderState,
} from '@cultural-aid/types/loader-state';
import {
  IMAGE_ANALYSIS_IN_PROGRESS,
  IMAGE_ANALYSIS_RESET,
  IMAGE_ANALYZED_ERROR,
  IMAGE_ANALYZED_REQUEST,
  IMAGE_ANALYZED_SUCCESS,
  ImageAnalysisActions,
} from '../actions/analysis';

import { ImageAnalysisResults } from '@cultural-aid/types';

const initialState: IDetailedLoadingState<ImageAnalysisResults> = new DetailedLoaderState(
  null
);

export const analysis = (
  state: IDetailedLoadingState<ImageAnalysisResults> = initialState,
  action: ImageAnalysisActions
): IDetailedLoadingState<ImageAnalysisResults> => {
  switch (action.type) {
    case IMAGE_ANALYZED_SUCCESS: {
      return {
        ...state,
        loading: false,
        value: action.payload,
        loadingMessage: '',
      };
    }
    case IMAGE_ANALYZED_REQUEST: {
      return { ...state, loading: true, loadingMessage: action.loadingMessage };
    }
    case IMAGE_ANALYSIS_IN_PROGRESS: {
      return { ...state, loadingMessage: action.loadingMessage };
    }
    case IMAGE_ANALYZED_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        loadingMessage: '',
      };
    }
    case IMAGE_ANALYSIS_RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
