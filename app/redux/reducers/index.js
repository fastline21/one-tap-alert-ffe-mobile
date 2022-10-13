import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import emergencyReducer from './emergency.reducer';
import emergencyTypesReducer from './emergency-types.reducer';
import locationReducer from './location.reducer';
import registerReducer from './register.reducer';
import emergencyProofsReducer from './emergency-proofs.reducer';

export default combineReducers({
  authState: authReducer,
  userState: userReducer,
  emergencyState: emergencyReducer,
  emergencyTypesState: emergencyTypesReducer,
  locationState: locationReducer,
  registerState: registerReducer,
  emergencyProofsState: emergencyProofsReducer,
});
