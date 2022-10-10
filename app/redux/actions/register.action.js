import {
  REGISTER_STEP,
  REGISTER_ERROR,
  REGISTER_LOADING,
} from '../types/register.type';

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
