/*
 * combines all th existing reducers
 */
import * as programReducer from './programReducer';
import * as userReducer from './userReducer';
export default Object.assign(programReducer, userReducer);
