import React from "react";
import { ChevronRight, TriangleAlert } from "lucide-react";

interface ButtonsSectionProps {
  totalQuestions: number;
  correctAnswers: number;
  handleShowFeedback: () => void;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({
  correctAnswers,
  totalQuestions,
  handleShowFeedback,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center gap-1 text-base font-semibold text-gray-900 mb-1">
            Try Again{" "}
            <ChevronRight className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5" />
          </h3>
          <p className="text-sm text-gray-600">
            Retake the test to improve your score.
          </p>
        </div>
        <div>
          <h3 className="flex items-center gap-1 p-1.5 rounded-4xl w-[150px] text-base font-semibold bg-[#FFE7C2]">
            <TriangleAlert className="w-4 h-4 text-[#992900]" />
            {totalQuestions - correctAnswers} Missed items
          </h3>
          <div onClick={handleShowFeedback} className="flex items-center cursor-pointer text-sm text-gray-800 font-semibold mt-4">
            Review your answers{" "}
            <ChevronRight className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
          <div className="text-sm text-gray-600 mt-2">
            You can retake the test to improve your score.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonsSection;
