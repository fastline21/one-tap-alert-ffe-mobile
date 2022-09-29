import axios from 'axios';

// ENV
import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

// Utilities
import { setToken } from '../../utilities/token';

export const submitEmergency = (data) => async (dispatch) => {
  try {
    setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(`${APP_SERVER_URL}/emergencies`, data, config);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
