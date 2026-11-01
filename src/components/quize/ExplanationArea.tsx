import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';

interface ExplanationAreaProps {
  explanation: string;
}

export const ExplanationArea: React.FC<ExplanationAreaProps> = ({ explanation }) => {
  const { isCorrect, isRevealed } = useSelector((state: RootState) => state.quiz);

  return (
    <section className="space-y-3">
      {isCorrect === false && !isRevealed && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md font-medium border border-red-200">
          不正解です。もう一度考えてみましょう！
        </div>
      )}

      {isCorrect === true && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md font-medium border border-green-200">
          正解です！お見事！
        </div>
      )}

      {isRevealed && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md space-y-2">
          <h4 className="font-bold text-blue-900 border-b border-blue-200 pb-1">解説</h4>
          <p className="text-gray-800 text-sm whitespace-pre-wrap">{explanation}</p>
        </div>
      )}
    </section>
  );
};
