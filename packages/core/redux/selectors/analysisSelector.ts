import { AppState } from '../';
import { ILoadingState } from '@cultural-aid/types/loader-state';

export const analysisSelector = (state: AppState): ILoadingState<any> =>
  state.analysis;
