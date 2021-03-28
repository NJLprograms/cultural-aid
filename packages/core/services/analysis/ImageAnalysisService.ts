import { ImageAnalysisRequestAction } from '../../redux/actions/analysis';
import { store } from '@cultural-aid/core/redux';

export class ImageAnalysisService {
  static analyzeImageFile(file: File) {
    store.dispatch(new ImageAnalysisRequestAction(file));
  }
}
