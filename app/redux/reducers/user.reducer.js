import { GET_USER_INFO } from '../types/user.type';

const initialState = {
  user: null,
  userInfo: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.data.user_info,
        loading: false,
      };
    default:
      return state;
  }
};
