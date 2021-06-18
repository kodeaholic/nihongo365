/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

import { DATA } from 'app/screens/Programs/data';

const initialState = {
  programs: DATA,
  selectedID: -1,
};

export const appointmentReducer = createReducer(initialState, {
  [types.APPOINTMENT_SELECTED](state, action) {
    return {
      ...state,
      selectedID: action.selectedID,
    };
  },
});
