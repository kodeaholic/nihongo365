/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const STATUS = {
  loading: -1,
  failed: 0,
  succeeded: 1,
};

const initialState = {
  status: -1, // loading
  user: {},
};

export const userReducer = createReducer(initialState, {
  [types.SOCIAL_LOGIN_FAILED](state, action) {
    return {
      ...state,
      status: STATUS.loading,
      user: {},
    };
  },
  [types.SOCIAL_LOGIN_FAILED](state, action) {
    return {
      ...state,
      status: STATUS.failed,
      user: {},
    };
  },
  [types.SOCIAL_LOGIN_SUCCEEDED](state, action) {
    const payload = action.actionPayload;
    const { user } = payload;
    return {
      ...state,
      status: STATUS.succeeded,
      user,
    };
  },
});
