import React from "react"

interface ScoreOverviewProps {
  percentage: number
  correctAnswers: number
  totalQuestions: number
  scoreColors: { bg: string; text: string; border: string; hover: string }
}

const ScoreOverview: React.FC<ScoreOverviewProps> = ({ percentage, correctAnswers, totalQuestions, scoreColors }) => {
  return (
    <div className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 ${scoreColors.bg} border ${scoreColors.border}`}>
      <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">Quiz Score</h2>
      <div className="flex items-center justify-between">
        <div className="text-5xl md:text-6xl font-bold">
          <span className={scoreColors.text}>
            {percentage}%
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <span className="block text-2xl font-bold text-emerald-600">{correctAnswers}</span>
            <span className="text-xs font-medium text-gray-600">Correct</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-rose-600">{totalQuestions - correctAnswers}</span>
            <span className="text-xs font-medium text-gray-600">Incorrect</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreOverview
