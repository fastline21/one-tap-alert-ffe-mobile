import axios from 'axios';

// Types
import {
  SUBMIT_EMERGENCY,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  EMERGENCIES_LOADING,
  STORE_EMERGENCY,
  GET_ALL_EMERGENCIES,
} from '../types/emergencies.type';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Utilities
import { setToken } from '../../utilities/token';

/**
 * Submit Emergency
 *
 * @param {*} data
 * @returns
 */
export const submitEmergency = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(`${APP_SERVER_URL}/emergencies`, data, config);

    dispatch({
      type: EMERGENCIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    dispatch({
      type: EMERGENCIES_ERROR,
      payload: {
        data: {
          error: true,
          message: error.message,
        },
      },
    });
  }
};

/**
 * Set loading to true
 *
 * @returns
 */
const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_LOADING,
  });
};

/**
 * Store Emergency
 *
 * @param {*} data
 * @returns
 */
export const storeEmergency = (data) => (dispatch) => {
  dispatch({
    type: STORE_EMERGENCY,
    payload: data,
  });
};

/**
 * Emergencies Clear Response
 *
 * @returns
 */
export const emergenciesClearResponse = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_CLEAR_RESPONSE,
  });
};

export const getAllEmergencies = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/emergencies`, config);

    dispatch({
      type: GET_ALL_EMERGENCIES,
      payload: res.data,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    dispatch({
      type: EMERGENCIES_ERROR,
      payload: {
        data: {
          error: true,
          message: error.message,
        },
      },
    });
  }
};
