import React from "react";
import { Result } from "@/types/quiz";
import ScoreOverview from "./ScoreOverview";
import TimeStats from "./TimeStats";
import TimePerQuestion from "./TimePerQuestion";
import LongestQuestions from "./LongestQuestions";
import ButtonsSection from "./ButtonsSection";
import {
  calculateTotalTime,
  formatTimeFromSeconds,
  getScoreColors,
} from "@/utils/quiz";
import QuestionFeedback from "./QuestionFeedback";
import { Button } from "../ui/button";

interface QuizResultsProps {
  results: Result;
  onTryAgain: () => void;
  onBack: () => void;
  onComplete: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  results,
  onTryAgain,
  onBack,
  onComplete,
}) => {
  const [showFeedback, setShowFeedback] = React.useState(false);
  const percentage = results?.percentage ?? 0;
  const scoreColors = getScoreColors(percentage);

  const totalTimeInSeconds = calculateTotalTime(results.timeCompleted);

  const timePerQuestion = results.timePerQuestion || 600;
  const totalAllowedTime = timePerQuestion;

  // Calculate remaining time
  const timeRemaining = Math.max(0, totalAllowedTime - totalTimeInSeconds);
  const timeRemainingFormatted = formatTimeFromSeconds(timeRemaining);

  const avgTimePerQuestion =
    results.totalQuestions > 0
      ? Math.round(totalTimeInSeconds / results.totalQuestions)
      : 0;
  const avgTimeFormatted = formatTimeFromSeconds(avgTimePerQuestion);

  const expectedTimeFormatted = formatTimeFromSeconds(timePerQuestion);

  const handleShowFeedback = () => {
    setShowFeedback((prev) => !prev);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {percentage >= 70 ? "Great job!" : `Don't worry, you'll bounce back!`}
      </h1>
      <p className="text-gray-600 text-base mb-6">
        {`Here's a quick overview of how you did on the quiz.`}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-3 flex flex-col gap-6">
          <ScoreOverview
            percentage={percentage}
            correctAnswers={results.correctAnswers}
            totalQuestions={results.totalQuestions}
            scoreColors={scoreColors}
          />

          <div className="grid grid-cols-3 gap-6">
            <TimeStats
              totalTimeInSeconds={totalTimeInSeconds}
              timeRemainingFormatted={timeRemainingFormatted}
            />
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-4">
                Time Per Question
              </h2>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Average Time
                </p>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {avgTimeFormatted.minutes}:
                  {String(avgTimeFormatted.seconds).padStart(2, "0")}
                </div>
                <p className="text-xs font-medium text-gray-500">
                  Expected: {expectedTimeFormatted.minutes}:
                  {String(expectedTimeFormatted.seconds).padStart(2, "0")}{" "}
                  minutes
                </p>
              </div>
            </div>
            <LongestQuestions longestQuestions={results.longestQuestions} />
          </div>
        </div>

        <ButtonsSection
          totalQuestions={results.totalQuestions}
          correctAnswers={results.correctAnswers}
          handleShowFeedback={handleShowFeedback}
        />
      </div>

      {results.questionFeedback &&
        results.questionFeedback.length > 0 &&
        showFeedback && (
          <QuestionFeedback feedbackItems={results.questionFeedback} />
        )}

      <div className="mt-6 flex justify-end">
        <Button
          onClick={onBack}
          variant='secondary'
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 font-medium text-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={onComplete}
          variant='default'
          className=" ml-5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium text-sm"
        >
          Complete
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
