import React from 'react';
import Timer from './Timer';

interface QuestionNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="w-1/3">
      <h2 className="text-md font-semibold">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>
    </div>

  </div>
);

export default QuestionNavigation;
