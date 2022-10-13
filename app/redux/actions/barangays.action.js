import axios from 'axios';

import {
  GET_ALL_BARANGAYS,
  BARANGAYS_LOADING,
  BARANGAYS_ERROR,
  BARANGAYS_CLEAR_RESPONSE,
  BARANGAYS_SUCCESS,
} from '../types/barangays.type';

import { setToken } from '../../utilities/token';

import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

export const getAllBarangays = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/barangays`, config);
    console.log(res.data);
    dispatch({
      type: GET_ALL_BARANGAYS,
      payload: res.data,
    });
    // dispatch({
    //   type: BARANGAYS_SUCCESS,
    //   payload: res.data,
    // });
  } catch (error) {
    dispatch({
      type: BARANGAYS_ERROR,
      payload: {
        statusCode: 500,
        message: error,
      },
    });
  }
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_LOADING,
  });
};

export const barangaysClearResponse = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_CLEAR_RESPONSE,
  });
};
