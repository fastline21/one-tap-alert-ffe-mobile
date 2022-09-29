import axios from 'axios';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Typest
import { GET_USER_INFO } from '../types/user.type';

// Get User Info
export const getUserInfo = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/user-info/${data}`, config);

    dispatch({
      type: GET_USER_INFO,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
