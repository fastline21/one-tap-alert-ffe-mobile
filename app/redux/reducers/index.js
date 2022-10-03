import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import emergencyReducer from './emergency.reducer';
import emergencyTypesReducer from './emergency-types.reducer';

export default combineReducers({
  authState: authReducer,
  userState: userReducer,
  emergencyState: emergencyReducer,
  emergencyTypesState: emergencyTypesReducer,
});
