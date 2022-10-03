import axios from 'axios';

// Types
import {
  SUBMIT_EMERGENCY,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  EMERGENCIES_LOADING,
  STORE_EMERGENCY,
} from '../types/emergencies.type';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Utilities
import { setToken } from '../../utilities/token';

/**
 *
 * @param {*} data
 * @returns
 */
export const submitEmergency = (data) => async (dispatch) => {
  console.log('submitEmergency -> data', JSON.stringify(data));
  // setLoading()(dispatch);

  // try {
  //   setToken('auth_token');

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-api-key': APP_SERVER_API_KEY,
  //     },
  //   };

  //   const res = await axios.post(`${APP_SERVER_URL}/emergencies`, data, config);

  //   dispatch({
  //     type: SUBMIT_EMERGENCY,
  //     payload: res.data,
  //   });
  // } catch (error) {}
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
