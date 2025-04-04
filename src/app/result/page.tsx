"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import QuizResults from "@/components/result/QuizResults"
import { Result } from "@/types/quiz"

const ResultPage = () => {
  const router = useRouter()
  const [quizResult, setQuizResult] = useState<Result | null>(null)

  useEffect(() => {
    const result = sessionStorage.getItem("result")
    if (!result) {
      router.push("/")
      return
    }
    setQuizResult(JSON.parse(result))
  }, [router])

  const handleTryAgain = () => {
    router.push("/quiz")
  }

  const handleBackToHome = () => {
    sessionStorage.removeItem("studyContent")
    sessionStorage.removeItem("result")
    router.push("/")
  }

  const handleComplete = () => {
    sessionStorage.removeItem("studyContent")
    sessionStorage.removeItem("result")
    router.push("/")
  }

  if (!quizResult) {
    return null
  }

  return (
      <main className="container mx-auto py-8 w-full">
        <QuizResults
          results={quizResult}
          onTryAgain={handleTryAgain}
          onBack={handleBackToHome}
          onComplete={handleComplete}
        />
      </main>
  )
}

export default ResultPage
