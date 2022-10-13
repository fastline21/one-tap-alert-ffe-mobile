import axios from 'axios';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

import { CREATE_EMERGENCY_PROOFS } from '../types/emergency-proofs.type';

// Utilities
import { setToken } from '../../utilities/token';

export const createEmergencyProofs = (data) => async (dispatch) => {
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

    // dispatch({
    //   type: CREATE_EMERGENCY_PROOFS,
    //   payload: res.data,
    // });
  } catch (error) {
    console.error(error);
  }
};
