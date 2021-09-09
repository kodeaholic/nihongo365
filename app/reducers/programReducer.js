/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
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
  [types.CHUHAN_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedChuHanLesson } = payload;
    return {
      ...state,
      selectedChuHanLesson: selectedChuHanLesson,
    };
  },
  [types.LISTENING_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedListeningLesson } = payload;
    return {
      ...state,
      selectedListeningLesson: selectedListeningLesson,
    };
  },
  [types.DIALOG_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedDialogLesson } = payload;
    return {
      ...state,
      selectedDialogLesson: selectedDialogLesson,
    };
  },
  [types.READING_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedReadingLesson } = payload;
    return {
      ...state,
      selectedReadingLesson: selectedReadingLesson,
    };
  },
  [types.SUB_TEST_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { subTest } = payload;
    return {
      ...state,
      subTest: subTest,
    };
  },
  [types.TRIAL_TEST_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { trialTest } = payload;
    return {
      ...state,
      trialTest: trialTest,
    };
  },
  [types.GRAMMAR_LESSON_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedGrammarLesson } = payload;
    return {
      ...state,
      selectedGrammarLesson: selectedGrammarLesson,
    };
  },
  [types.NEWS_ARTICLE_SELECTED](state, action) {
    const payload = action.actionPayload;
    const { selectedNewsArticle } = payload;
    return {
      ...state,
      selectedNewsArticle: selectedNewsArticle,
    };
  },
});
