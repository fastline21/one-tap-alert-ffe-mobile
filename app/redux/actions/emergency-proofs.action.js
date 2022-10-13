import axios from 'axios';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

import {
  EMERGENCY_PROOFS_SUCCESS,
  EMERGENCY_PROOFS_LOADING,
  EMERGENCY_PROOFS_CLEAR_RESPONSE,
} from '../types/emergency-proofs.type';

// Utilities
import { setToken } from '../../utilities/token';

export const createEmergencyProofs = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(
      `${APP_SERVER_URL}/emergency-proofs`,
      data,
      config
    );

    dispatch({
      type: EMERGENCY_PROOFS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error('createEmergencyProofs', error);
  }
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_PROOFS_LOADING,
  });
};

export const emergencyProofsClearResponse = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_PROOFS_CLEAR_RESPONSE,
  });
};
