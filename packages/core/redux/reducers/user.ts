import { ILoadingState, LoaderState } from '@cultural-aid/types/loader-state';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROCESS_STATE_LOGIN,
  PROCESS_STATE_LOGOUT,
  PROCESS_STATE_SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  USER_DETECTED_ACTION,
  UserActions,
} from '../actions/user';

import { User } from '@cultural-aid/types/user';

const initialState: ILoadingState<User> = new LoaderState(null);

export const user = (
  state: ILoadingState<User> = initialState,
  action: UserActions
): ILoadingState<User> => {
  switch (action.type) {
    case LOGIN_SUCCESS || SIGN_UP_SUCCESS: {
      return { ...state, loading: false, value: action.payload };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, loading: false, value: null };
    }
    case PROCESS_STATE_LOGIN || PROCESS_STATE_LOGOUT || PROCESS_STATE_SIGN_UP: {
      return { ...state, loading: true, error: null };
    }
    case LOGIN_ERROR || SIGN_UP_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case USER_DETECTED_ACTION: {
      return { ...state, value: action.payload };
    }
    default:
      return state;
  }
};
