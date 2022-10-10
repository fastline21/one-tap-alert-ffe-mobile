import {
  SUBMIT_EMERGENCY,
  EMERGENCIES_ERROR,
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_CLEAR_RESPONSE,
  STORE_EMERGENCY,
  GET_ALL_EMERGENCIES,
} from '../types/emergencies.type';

const initialState = {
  emergencyTypes: null,
  emergencies: null,
  emergency: null,
  success: null,
  error: null,
  loading: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_EMERGENCY:
      return {
        ...state,
        loading: false,
      };
    case EMERGENCIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCIES_SUCCESS:
      return {
        ...state,
        success: action.payload.data.success,
        message: action.payload.data.message,
        loading: false,
      };
    case EMERGENCIES_ERROR:
      return {
        ...state,
        error: action.payload.data.error,
        message: action.payload.data.message,
        loading: false,
      };
    case EMERGENCIES_CLEAR_RESPONSE:
      return {
        ...state,
        success: null,
        error: null,
        loading: false,
        message: null,
      };
    case STORE_EMERGENCY:
      const { payload } = action;

      return {
        ...state,
        loading: false,
        emergency: { ...state.emergency, ...payload },
      };
    case GET_ALL_EMERGENCIES:
      console.log(action.payload);
      const {
        data: { emergencies },
        message,
        success,
      } = action.payload;

      return {
        ...state,
        emergencies,
        message,
        success,
        loading: false,
      };
    default:
      return state;
  }
};
