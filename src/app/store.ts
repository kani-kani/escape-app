import { configureStore } from '@reduxjs/toolkit';

import { sliceLogger } from '../utils/sliceLogger';
import userReducer from './loginSlice';
import quizReducer from './quizeSlice';
export { login, logout } from './loginSlice';
export { checkAnswer, resetQuizState, revealExplanation, setAnswerInput, toggleHint } from './quizeSlice';

// Storeの作成
export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },

  // dev起動時にReduxの中を確認可能にする
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sliceLogger),
});

// コンポーネント側で利用する共通の型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
