import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAnswer, revealExplanation, setAnswerInput } from '../../app/quizeSlice';
import { type RootState } from '../../app/store';

interface AnswerFormAreaProps {
  correctAnswer: string;
}

export const AnswerFormArea: React.FC<AnswerFormAreaProps> = ({ correctAnswer }) => {
  const dispatch = useDispatch();
  const { answerInput, isDisabled, isRevealed } = useSelector((state: RootState) => state.quiz);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    dispatch(checkAnswer(correctAnswer));
  };

  return (
    <section className="space-y-4">
      <form onSubmit={handleCheck} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            解答入力
          </label>
          <input
            type="text"
            value={answerInput}
            onChange={(e) => dispatch(setAnswerInput(e.target.value))}
            disabled={isDisabled}
            placeholder={isDisabled ? "これ以上入力できません" : "答えを入力してください"}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
            }`}
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isDisabled || !answerInput.trim()}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-white transition-colors ${
              isDisabled || !answerInput.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            回答
          </button>

          <button
            type="button"
            onClick={() => dispatch(revealExplanation())}
            disabled={isRevealed}
            className={`py-2 px-4 rounded-md font-semibold text-white transition-colors ${
              isRevealed
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
              }`}
          >
            解説
          </button>
        </div>
      </form>
    </section>
  );
};
