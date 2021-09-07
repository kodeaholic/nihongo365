/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
// import * as loginReducer from './loginReducer';
import * as programReducer from './programReducer';
import * as userReducer from './userReducer';
export default Object.assign(
  // loginReducer,
  // loadingReducer,
  programReducer,
  userReducer,
);
