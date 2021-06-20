/*
 * Reducer actions related with login
 */
import * as types from './types';

export function levelSelected(actionPayload) {
  return {
    type: types.LEVEL_SELECTED,
    actionPayload: actionPayload,
  };
}
