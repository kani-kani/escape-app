import React from 'react';

interface QuestionAreaProps {
  id: string;
  questionText: string;
  imagePath?: string;
}

export const QuestionArea: React.FC<QuestionAreaProps> = ({ id, questionText, imagePath }) => {
  return (
    <section className="border-b pb-4">
      <h2 className="text-xl font-bold mb-2">問題 {id}</h2>
      {imagePath && (
        <div className="mb-4 flex justify-center">
          <img
            src={imagePath}
            alt={`問題 ${id}`}
            className="max-w-full h-auto rounded border"
          />
        </div>
      )}
      <p className="text-gray-800 whitespace-pre-wrap">{questionText}</p>
    </section>
  );
};
