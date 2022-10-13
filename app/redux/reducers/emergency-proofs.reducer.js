import {
  EMERGENCY_PROOFS_LOADING,
  EMERGENCY_PROOFS_ERROR,
} from '../types/emergency-proofs.type';

const initialState = {
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCY_PROOFS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCY_PROOFS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
