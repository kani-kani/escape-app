import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Logout from '../Logout';
import { QuizContainer } from './QuizContainer';
import { type QuizData } from './type/quizType';

interface QuizRouterProps {
  quizList: QuizData[];
}

export const QuizRouter: React.FC<QuizRouterProps> = ({ quizList }) => {
  const { quizId } = useParams<{ quizId: string }>();
  const currentQuiz = quizList.find((q) => q.id === quizId);

  if (quizList.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>問題データを読み込んでいます...</div>;
  }

  if (!currentQuiz) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#e74c3c', marginBottom: '15px' }}>指定された問題（ID: {quizId}）が見つかりません。</p>
        <Link to="/" style={{ color: '#3182ce', textDecoration: 'underline' }}>問題一覧へ戻る</Link>
      </div>
    );
  }

  // 前後の問題へのナビゲーションリンク
  const currentIndex = quizList.findIndex((q) => q.id === quizId);
  const prevQuiz = quizList[currentIndex - 1];
  const nextQuiz = quizList[currentIndex + 1];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ maxWidth: '2xl', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', padding: '0 8px', fontSize: '14px' }}>
        {prevQuiz ? (
          <Link to={`/quiz/${prevQuiz.id}`} style={{ color: '#3182ce', textDecoration: 'none' }}>◀ 前の問題</Link>
        ) : <span style={{ color: '#cbd5e0' }}>◀ 最初</span>}

        <Link to="/" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: 'bold' }}> 問題一覧へ戻る</Link>

        {nextQuiz ? (
          <Link to={`/quiz/${nextQuiz.id}`} style={{ color: '#3182ce', textDecoration: 'none' }}>次の問題 ▶</Link>
        ) : <span style={{ color: '#cbd5e0' }}>最後</span>}
      </div>

      <QuizContainer quizData={currentQuiz} />

      <Logout/>
    </div>
  );
};

export default QuizRouter;
