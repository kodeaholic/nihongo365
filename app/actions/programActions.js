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

export function listeningLessonSelected(actionPayload) {
  return {
    type: types.LISTENING_LESSON_SELECTED,
    actionPayload: actionPayload,
  };
}

export function dialogLessonSelected(actionPayload) {
  return {
    type: types.DIALOG_LESSON_SELECTED,
    actionPayload: actionPayload,
  };
}
export function readingLessonSelected(actionPayload) {
  return {
    type: types.READING_LESSON_SELECTED,
    actionPayload: actionPayload,
  };
}
export function subTestSelected(actionPayload) {
  return {
    type: types.SUB_TEST_SELECTED,
    actionPayload: actionPayload,
  };
}
export function trialTestSelected(actionPayload) {
  return {
    type: types.TRIAL_TEST_SELECTED,
    actionPayload: actionPayload,
  };
}
