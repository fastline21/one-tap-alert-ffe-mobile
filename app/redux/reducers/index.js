import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import emergencyReducer from './emergency.reducer';

export default combineReducers({
  authState: authReducer,
  userState: userReducer,
  emergencyState: emergencyReducer,
});
