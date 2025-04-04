"use client";

import { useState, useEffect } from "react";
// import QuizResults from './QuizResults';
import { Question, Result } from "@/types/quiz";
import QuizQuestion from "./QuizQuestion";
import Timer from "./Timer";
import QuestionNavigation from "./QuestionNumber";
import React from "react";
import QuizLoading from "./QuizLoading";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface QuizContainerProps {
  studyContent: string;
  onComplete: (results: Result) => void;
  onBack: () => void;
  timeLimitInSeconds?: number;
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  studyContent,
  onComplete,
  onBack,
  timeLimitInSeconds = 600,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Generating Quiz...");
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimitInSeconds);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<
    Record<string, number>
  >({});
  const [currentQuestionStartTime, setCurrentQuestionStartTime] =
    useState<number>(Date.now());

  useEffect(() => {
    generateQuiz(studyContent);
  }, [studyContent]);

  useEffect(() => {
    if (!isLoading && !isQuizComplete && !quizStartTime) {
      setQuizStartTime(Date.now());
      setCurrentQuestionStartTime(Date.now());
    }
  }, [isLoading, isQuizComplete, quizStartTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (quizStartTime) {
        const elapsedTime = Math.floor((Date.now() - quizStartTime) / 1000);
        setTimeLeft(Math.max(0, timeLimitInSeconds - elapsedTime));
        if (timeLeft <= 0) {
          clearInterval(timer);
          evaluateQuiz();
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizStartTime]);

  useEffect(() => {
    if (!isLoading) {
      const currentQuestion = questions[currentQuestionIndex]?.id;
      if (currentQuestion) {
        setTimeSpentPerQuestion((prev) => ({
          ...prev,
          [currentQuestion]:
            (prev[currentQuestion] || 0) +
            (Date.now() - currentQuestionStartTime) / 1000,
        }));
        setCurrentQuestionStartTime(Date.now());
      }
    }
  }, [currentQuestionIndex]);

  const generateQuiz = async (content: string) => {
    try {
      setIsLoading(true);
      setLoadingMessage("Generating Quiz...");
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      setQuestions(data.questions);
      setIsLoading(false);
    } catch {
      setLoadingMessage("Failed to generate quiz. Please try again.");
      setIsLoading(false);
    }
  };

  const evaluateQuiz = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage("Analyzing your answers...");

      const totalTimeInSeconds = Math.floor(
        (Date.now() - quizStartTime!) / 1000
      );
      const minutes = Math.floor(totalTimeInSeconds / 60);
      const seconds = totalTimeInSeconds % 60;

      const response = await fetch("/api/evaluate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions, userAnswers }),
      });

      if (!response.ok) throw new Error("Failed to evaluate quiz");

      const results = await response.json();
      setQuizResults({
        ...results,
        timeCompleted: { hours: 0, minutes, seconds },
      });
      setIsQuizComplete(true);
      onComplete(results);
      setIsLoading(false);
    } catch {
      setLoadingMessage("Failed to evaluate quiz. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = (
    questionId: string,
    answer: string | string[]
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      evaluateQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (isLoading) return <QuizLoading message={loadingMessage} />;

  //   if (isQuizComplete && quizResults) {
  //     return <QuizResults results={quizResults} onTryAgain={() => window.location.reload()} onBack={onBack} />;
  //   }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="w-1/3 flex mb-4">
        <div className="text-sm pr-3 py-1 rounded font-mono">Time Left</div>
        <Timer timeLeft={timeLeft} />
      </div>
      <QuestionNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        {questions.length > 0 && (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            currentAnswer={userAnswers[questions[currentQuestionIndex].id]}
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-gray-700 dark:border-gray-500">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
          <Button
          variant='outline'
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`gap-2 px-4 py-2 rounded-md text-white ${
              currentQuestionIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleNextQuestion}
              className="gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="mt-6 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-md text-white ${currentQuestionIndex === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600'
              }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {currentQuestionIndex === questions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </button>
        </div> */}
    </div>
  );
};

export default QuizContainer;
