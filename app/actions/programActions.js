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

export function vocabLessonSelected(actionPayload) {
  return {
    type: types.VOCAB_LESSON_SELECTED,
    actionPayload: actionPayload,
  };
}

export function chuHanLessonSelected(actionPayload) {
  return {
    type: types.CHUHAN_LESSON_SELECTED,
    actionPayload: actionPayload,
  };
}
