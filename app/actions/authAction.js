import axios from 'axios';

import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

import { getToken } from '../utilities/token';

import { setToken } from '../utilities/token';

export const loginUser = async (data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(`${APP_SERVER_URL}/auth`, data, config);

    return res.data.data;
  } catch (error) {
    const {
      data: { message },
      status_code: statusCode,
    } = error.response.data;

    return { message, statusCode };
  }
};

export const authUser = async () => {
  try {
    await setToken('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.get(`${APP_SERVER_URL}/auth`, config);

    return res.data.data;
  } catch (error) {
    const {
      data: { message },
      status_code: statusCode,
    } = error.response.data;

    return { message, statusCode };
  }
};
