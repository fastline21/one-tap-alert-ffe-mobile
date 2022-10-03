import {
  GET_ALL_EMERGENCY_TYPES,
  EMERGENCY_TYPES_LOADING,
  EMERGENCY_TYPES_ERROR,
} from '../types/emergency-types.type';

const initialState = {
  emergencyTypes: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCY_TYPES:
      return {
        ...state,
        emergencyTypes: action.payload.data.emergency_types,
        loading: false,
      };
    case EMERGENCY_TYPES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCY_TYPES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
