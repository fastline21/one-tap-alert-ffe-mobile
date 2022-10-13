import {
  EMERGENCY_PROOFS_LOADING,
  EMERGENCY_PROOFS_ERROR,
  EMERGENCY_PROOFS_SUCCESS,
} from '../types/emergency-proofs.type';

const initialState = {
  error: false,
  loading: false,
  message: null,
  success: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCY_PROOFS_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        loading: false,
      };
    case EMERGENCY_PROOFS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCY_PROOFS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
