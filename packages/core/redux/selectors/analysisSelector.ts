import { AppState } from '../';
import { IDetailedLoadingState } from '@cultural-aid/types/loader-state';
import { ImageAnalysisResults } from '@cultural-aid/types';

export const analysisSelector = (
  state: AppState
): IDetailedLoadingState<ImageAnalysisResults> => state.analysis;
