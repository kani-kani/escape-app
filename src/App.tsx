import './App.css';

import { useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { type RootState } from './app/store';
import Login from './components/Login';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import QuizRouter from './components/quize/QuizRouter';

function App() {
  const { quizList } = useSelector((state: RootState) => state.quiz);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          {/* ログイン画面 */}
          <Route path="/login" element={<Login />} />

          {/* メイン画面 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          {/* クイズ詳細画面 */}
          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute>
                <QuizRouter quizList={quizList} />
              </ProtectedRoute>
            }
          />

          {/* それ以外のURLはすべてログイン画面かトップに安全にリダイレクト */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
