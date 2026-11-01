import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetQuizState } from '../../app/quizeSlice';
import { AnswerFormArea } from './AnswerFormArea';
import { ExplanationArea } from './ExplanationArea';
import { HintArea } from './HintArea';
import { QuestionArea } from './QuestionArea';
import { type QuizData } from './type/quizType';

interface QuizContainerProps {
  quizData: QuizData;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({ quizData }) => {
  const dispatch = useDispatch();

  // 問題が切り替わったタイミングでステートを初期化
  useEffect(() => {
    dispatch(resetQuizState());
  }, [quizData.id, dispatch]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <QuestionArea
        id={quizData.id}
        questionText={quizData.questionText}
        imagePath={quizData.imagePath}
      />
      <AnswerFormArea correctAnswer={quizData.answer} />
      <ExplanationArea explanation={quizData.explanation} />
      <HintArea hints={quizData.hints} />
    </div>
  );
};
