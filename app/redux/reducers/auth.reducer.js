import { LOGIN_USER, AUTH_USER, AUTH_LOADING } from '../types/auth.type';

import { storeToken, removeToken, getToken } from '../../utilities/token';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      storeToken('auth_token', action.payload.data.token);

      return state;
    case AUTH_USER:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
