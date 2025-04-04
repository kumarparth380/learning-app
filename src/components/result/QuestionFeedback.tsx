import React from "react"

interface QuestionFeedbackItem {
  question: string
  correct: boolean
  feedback?: string
}

interface QuestionFeedbackProps {
  feedbackItems: QuestionFeedbackItem[]
}

const QuestionFeedback: React.FC<QuestionFeedbackProps> = ({ feedbackItems }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h2>
      <div className="space-y-4">
        {feedbackItems.map((item, index) => (
          <div
            key={index}
            className="border-l-4 pl-4 py-3 hover:bg-gray-50 transition-colors duration-200"
            style={{ borderColor: item.correct ? "#059669" : "#dc2626" }}
          >
            <p className="text-sm font-medium text-gray-900 mb-1">{item.question}</p>
            <p className={`text-sm font-medium ${item.correct ? "text-emerald-600" : "text-rose-600"}`}>
              {item.correct ? "✓ Correct" : "✗ Incorrect"}
            </p>
            {!item.correct && item.feedback && (
              <p className="text-xs text-gray-600 mt-1">{item.feedback}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionFeedback
