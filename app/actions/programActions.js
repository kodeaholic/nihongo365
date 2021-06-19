/*
 * Reducer actions related with login
 */
import * as types from './types';

export function programSelected(selectedID) {
  return {
    type: types.PROGRAM_SELECTED,
    selectedID,
  };
}
