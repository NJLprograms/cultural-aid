import {
  ImageAnalysisRequestAction,
  ImageAnalysisStateResetAction,
} from '../../redux/actions/analysis';

import { store } from '@cultural-aid/core/redux';

export class ImageAnalysisService {
  static AnalyzeImageFile(file: File) {
    store.dispatch(new ImageAnalysisRequestAction(file));
  }

  static ResetAnalysis() {
    store.dispatch(new ImageAnalysisStateResetAction());
  }
}
