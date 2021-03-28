import { ImageAnalysisActions } from '@cultural-aid/core/redux/actions/analysis';
import { ProcessActions } from '@cultural-aid/core/redux/actions/process';
import { UserActions } from '@cultural-aid/core/redux/actions/user';

export type StoreActions = UserActions | ProcessActions | ImageAnalysisActions;
