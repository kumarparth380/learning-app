import React from "react"

interface TimePerQuestionProps {
  avgTimeFormatted: { minutes: string, seconds: string }
  expectedTimeFormatted: { minutes: string, seconds: string }
}

const TimePerQuestion: React.FC<TimePerQuestionProps> = ({ avgTimeFormatted, expectedTimeFormatted }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
      <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-4">Time Per Question</h2>
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2">Average Time</p>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {avgTimeFormatted.minutes}:{String(avgTimeFormatted.seconds).padStart(2, '0')}
        </div>
        <p className="text-xs font-medium text-gray-500">
          Expected: {expectedTimeFormatted.minutes}:{String(expectedTimeFormatted.seconds).padStart(2, '0')} minutes
        </p>
      </div>
    </div>
  )
}

export default TimePerQuestion
