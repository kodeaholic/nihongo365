/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

import { DATA } from 'app/screens/Programs/data';

const initialState = {
  programs: DATA,
  selectedID: -1,
  selectedLevel: '',
  selectedVocabLesson: {
    id: '',
    name: '',
    chapterName: '',
    chapterDescription: '',
    audioSrc: '',
  },
};

export const programReducer = createReducer(initialState, {
  [types.LEVEL_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedID, selectedLevel } = payload;
    return {
      ...state,
      selectedID: selectedID,
      selectedLevel: selectedLevel,
    };
  },
  [types.VOCAB_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedVocabLesson } = payload;
    return {
      ...state,
      selectedVocabLesson: selectedVocabLesson,
    };
  },
});
