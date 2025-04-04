"use client";

import StudyTextSection from "./StudyTextSection";
import FileUploadSection from "./FileUploadSection";
import { useStudyContent } from "@/hooks/useStudyContent";

const TutorSection = () => {
  const {
    fileToUpload,
    setFileToUpload,
    studyText,
    setStudyText,
    isLoading,
    error,
    handleStartStudying,
  } = useStudyContent();

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-4 mb-2">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 mb-6">
        <div className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <span className="font-medium">AI tutor</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>

      <FileUploadSection
        fileToUpload={fileToUpload}
        setFileToUpload={setFileToUpload}
      />

      <StudyTextSection
        studyText={studyText}
        setStudyText={setStudyText}
        handleStartStudying={handleStartStudying}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TutorSection;
