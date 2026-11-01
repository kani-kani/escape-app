import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHint } from '../../app/quizeSlice';
import { type RootState } from '../../app/store';

interface HintAreaProps {
  hints: string[];
}

export const HintArea: React.FC<HintAreaProps> = ({ hints }) => {
  const dispatch = useDispatch();
  const openHintIndex = useSelector((state: RootState) => state.quiz.openHintIndex);

  return (
    <section className="bg-gray-50 p-4 rounded border">
      <h3 className="font-semibold text-gray-700 mb-2">ヒント（段階的に表示されます）</h3>
      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div key={index} className="border rounded bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => dispatch(toggleHint(index))}
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
            >
              <span className="font-medium text-sm text-gray-600">ヒント {index + 1}</span>
              <span>{openHintIndex === index ? '▲' : '▼'}</span>
            </button>
            {openHintIndex === index && (
              <div className="p-3 text-gray-700 text-sm border-t bg-amber-50">
                {hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
