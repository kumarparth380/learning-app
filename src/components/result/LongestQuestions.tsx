import React from "react"
import { ChevronRight } from "lucide-react"

interface LongestQuestionsProps {
  longestQuestions?: number[]
}

const LongestQuestions: React.FC<LongestQuestionsProps> = ({ longestQuestions = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
      <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-4">Questions That Took Longest</h2>
      <div className="space-y-2">
        {longestQuestions.map((q, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-gray-100">
              <span className="text-sm font-medium text-gray-700">Question {q}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LongestQuestions
