import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type QuizState } from '../components/quize/type/quizType';

const initialState: QuizState & { isLoading: boolean } = {
  quizList: [],
  isLoading: false,
  setQuizLoading: false,
  answerInput: '',
  isCorrect: null,
  isRevealed: false,
  isDisabled: false,
  openHintIndex: -1,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // CSVから取得したクイズリストをセットする
    setQuizList: (state, action: PayloadAction<any[]>) => {
      state.quizList = action.payload;
      state.isLoading = false;
    },

    // ローディング状態を明示的に変更する
    setQuizLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if ('setQuizLoading' in state) {
        state.setQuizLoading = action.payload;
      }
    },

    setAnswerInput: (state, action: PayloadAction<string>) => {
      state.answerInput = action.payload;
    },
    checkAnswer: (state, action: PayloadAction<string>) => {
      const correctInput = state.answerInput.trim();
      const correctAnswer = action.payload.trim();

      if (correctInput === correctAnswer) {
        state.isCorrect = true;
        state.isRevealed = true;
        state.isDisabled = true;
      } else {
        state.isCorrect = false;
      }
    },
    revealExplanation: (state) => {
      state.isRevealed = true;
      state.isDisabled = true;
    },
    toggleHint: (state, action: PayloadAction<number>) => {
      state.openHintIndex = state.openHintIndex === action.payload ? -1 : action.payload;
    },
    // 問題切り替え時のリセット
    resetQuizState: (state) => {
      state.answerInput = '';
      state.isCorrect = null;
      state.isRevealed = false;
      state.isDisabled = false;
      state.openHintIndex = -1;
    },
  },
});

export const {
  setQuizList,
  setQuizLoading,
  setAnswerInput,
  checkAnswer,
  revealExplanation,
  toggleHint,
  resetQuizState
} = quizSlice.actions;

export default quizSlice.reducer;
