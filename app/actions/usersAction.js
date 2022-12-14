import axios from 'axios';

import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

import { setToken } from '../utilities/token';

import { authUser } from './authAction';

export const getUserInfo = async () => {
  try {
    const { user_id: userID } = await authUser();

    await setToken('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(
      `${APP_SERVER_URL}/user-info/${userID}`,
      config
    );

    return res.data.data;
  } catch (error) {
    const {
      data: { message },
      status_code: statusCode,
    } = error.response.data;

    return { message, statusCode };
  }
};

export const createUser = async (data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(
      `${APP_SERVER_URL}/users/register`,
      data,
      config
    );

    return res.data.data;
  } catch (error) {
    const {
      data: { message },
      status_code: statusCode,
    } = error.response.data;

    return { message, statusCode };
  }
};
