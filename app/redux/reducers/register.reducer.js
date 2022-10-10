import {
  REGISTER_STEP,
  REGISTER_LOADING,
  REGISTER_ERROR,
} from '../types/register.type';

const initialState = {
  register: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STEP:
      return {
        ...state,
        register: { ...state.register, ...action.payload },
        loading: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
