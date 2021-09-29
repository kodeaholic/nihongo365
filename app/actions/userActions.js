/*
 * Reducer actions related with login
 */
import * as types from './types';

function socialLogin(actionPayload) {
  return {
    type: types.SOCIAL_LOGIN_LOADING,
  };
}

function socialLoginFailed(actionPayload) {
  return {
    type: types.SOCIAL_LOGIN_FAILED,
  };
}

function socialLoginSucceeded(actionPayload) {
  return {
    type: types.SOCIAL_LOGIN_SUCCEEDED,
    actionPayload,
  };
}

function completedItemsUpdated(actionPayload) {
  return {
    type: types.COMPLETED_ITEMS_UPDATED,
    actionPayload,
  };
}

export const userActions = {
  socialLogin,
  socialLoginFailed,
  socialLoginSucceeded,
  completedItemsUpdated,
};
