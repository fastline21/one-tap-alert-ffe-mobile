import axios from 'axios';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Types
import {
  AUTH_USER,
  LOGIN_USER,
  AUTH_LOADING,
  AUTH_ERROR,
} from '../types/auth.type';

// Utilities
import { setToken } from '../../utilities/token';

// Login User
export const loginUser = (data) => async (dispatch) => {
  // Set loading to true
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(`${APP_SERVER_URL}/auth`, data, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    authUser()(dispatch);
  } catch (error) {
    return dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode: 500,
        message: error,
      },
    });

    // const {
    //   status_code: statusCode,
    //   data: { message },
    // } = error.response.data;

    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: {
    //     statusCode,
    //     message,
    //   },
    // });
  }
};

// Auth User
export const authUser = () => async (dispatch) => {
  // Set loading to true
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/auth`, config);

    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    return dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode: 500,
        message: error,
      },
    });

    // const {
    //   status_code: statusCode,
    //   data: { message },
    // } = error.response.data;

    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: {
    //     statusCode,
    //     message,
    //   },
    // });
  }
};

// Loading
const setLoading = () => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
};
