import { AppState } from '@cultural-aid/core/redux';
import { ProcessSlice } from '@cultural-aid/types/process';

export const resetProcessSelector = (state: AppState): ProcessSlice =>
  state.process.RESET;
