import axios from 'axios';

// Types
import {
  GET_ALL_EMERGENCY_TYPES,
  EMERGENCY_TYPES_ERROR,
  EMERGENCY_TYPES_LOADING,
} from '../types/emergency-types.type';

// Utilities
import { setToken } from '../../utilities/token';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

/**
 * All Emergency Types
 *
 * @returns
 */
export const getAllEmergencyTypes = () => async (dispatch) => {
  // Set loading to true
  // setLoading()(dispatch);

  try {
    // Set auth token in headers
    await setToken('auth_token');

    // Config options
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/emergency-types`, config);

    dispatch({
      type: GET_ALL_EMERGENCY_TYPES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EMERGENCY_TYPES_ERROR,
      payload: {
        statusCode: 500,
        message: error,
      },
    });
  }
};

/**
 * Emergency Types Loading
 *
 * @returns
 */
const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_TYPES_LOADING,
  });
};
