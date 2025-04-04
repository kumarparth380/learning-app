"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Result } from "@/types/quiz";
import QuizContainer from "@/components/quiz/QuizContainer";

const QuizPage = () => {
  const router = useRouter();
  const [studyContent, setStudyContent] = useState<string>("");

  useEffect(() => {
    const content = sessionStorage.getItem("studyContent");
    if (content) {
      setStudyContent(content);
    }
  }, []);

  const handleQuizComplete = (results: Result) => {
    sessionStorage.setItem("result", JSON.stringify(results));
    router.push("/result");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <QuizContainer
        studyContent={studyContent}
        onComplete={handleQuizComplete}
        onBack={handleBack}
      />
    </div>
  );
};

export default QuizPage;
