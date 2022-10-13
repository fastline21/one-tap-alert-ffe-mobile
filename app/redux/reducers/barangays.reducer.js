import {
  GET_ALL_BARANGAYS,
  BARANGAYS_ERROR,
  BARANGAYS_LOADING,
  BARANGAYS_SUCCESS,
  BARANGAYS_CLEAR_RESPONSE,
} from '../types/barangays.type';

import { storeToken, removeToken, getToken } from '../../utilities/token';

const initialState = {
  barangays: null,
  error: false,
  success: false,
  message: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BARANGAYS:
      return {
        ...state,
        loading: false,
        barangays: action.payload.data.barangays,
      };
    case BARANGAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case BARANGAYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BARANGAYS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
        loading: false,
      };
    case BARANGAYS_CLEAR_RESPONSE:
      return {
        ...state,
        loading: false,
        message: null,
        success: false,
        error: false,
      };
    default:
      return state;
  }
};
