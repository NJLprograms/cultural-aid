import { User } from '@cultural-aid/types/user';
import { ILoadingState } from '@cultural-aid/types/loader-state';
import { AppState } from '../';

export const userSelector = (state: AppState): ILoadingState<User> =>
  state.user;
