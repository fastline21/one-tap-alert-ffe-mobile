import {
  REGISTER_STEP,
  REGISTER_ERROR,
  REGISTER_LOADING,
  SUBMIT_REGISTER,
} from '../types/register.type';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Utilities
import { setToken } from '../../utilities/token';

export const registerStep = (data) => (dispatch) => {
  try {
    dispatch({
      type: REGISTER_STEP,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const submitRegister = (data) => async (dispatch) => {
  try {
    setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(
      `${APP_SERVER_URL}/users/register`,
      data,
      config
    );

    dispatch({
      type: SUBMIT_REGISTER,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
