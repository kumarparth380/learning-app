import React from "react"

interface TimeStatsProps {
  totalTimeInSeconds: number
  timeRemainingFormatted: { formatted: string }
}

const TimeStats: React.FC<TimeStatsProps> = ({ totalTimeInSeconds, timeRemainingFormatted }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
      <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-4">Time Stats</h2>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Time Taken</p>
          <div className="flex items-center space-x-2">
            {[
              Math.floor(totalTimeInSeconds / 60),
              totalTimeInSeconds % 60
            ].map((value, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-mono">
                  {String(value).padStart(2, '0')}
                </div>
                {idx < 1 && <span className="text-xl text-gray-400">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Time Remaining</p>
          <div className="text-base font-semibold text-amber-600">
            {timeRemainingFormatted.formatted}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeStats
