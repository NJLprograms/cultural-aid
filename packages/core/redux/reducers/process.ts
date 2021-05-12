import {
  ProcessActions,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PROCESS_STATE,
} from '@cultural-aid/core/redux/actions/process';

import { ProcessState } from '@cultural-aid/types/process';

const initialState = new ProcessState();

export const process = (
  state: ProcessState = initialState,
  action: ProcessActions
): ProcessState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return { ...state, RESET: { ...state.RESET, loading: true } };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        RESET: { ...state.RESET, loading: false, success: true },
      };
    }

    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        RESET: { ...state.RESET, loading: false, error: action.payload },
      };
    }

    case RESET_PROCESS_STATE: {
      return { ...initialState };
    }
    default:
      return state;
  }
};
