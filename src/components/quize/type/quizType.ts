export interface QuizData {
  id: string;
  questionText: string;
  imagePath?: string;
  hints: string[];
  answer: string;
  explanation: string;
}

export interface QuizState {
  quizList: QuizData[];
  setQuizLoading: boolean;
  answerInput: string;
  isCorrect: boolean | null;
  isRevealed: boolean;
  isDisabled: boolean;
  openHintIndex: number;
}
