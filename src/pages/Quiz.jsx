import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import quizQuestions from "../utils/quizQuestions"
import JerryImg from "../assets/Jerry-result.webp"
import { Sparkles, Brain, Laugh, Rocket, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Quiz = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const startQuiz = () => setIsStarted(true)

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index)
    setIsLoading(true)

    // Simulate loading to prevent image flashing issues
    setTimeout(() => {
      setIsLoading(false)
      nextQuestion()
      setSelectedAnswer(null)
    }, 600)
  }

  const nextQuestion = () => {
    setCurrentQuestion((prevQuestion) => {
      if (prevQuestion + 1 === quizQuestions.length) {
        setIsFinished(true)
        return 0
      } else {
        return prevQuestion + 1
      }
    })
  }

  const startAgain = () => {
    setIsStarted(false)
    setIsFinished(false)
    setCurrentQuestion(0)
  }

  // Preload images to prevent flashing
  useEffect(() => {
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        const img = new Image()
        img.src = answer.imgUrl
      })
    })

    const resultImg = new Image()
    resultImg.src = JerryImg
  }, [])

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center">
        <Badge variant="outline" className="mb-2">
          <Brain className="mr-1 h-3 w-3" />
          <span>Personality Quiz</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Discover Your Personality!</h1>
        <p className="max-w-[700px] text-muted-foreground">
          The most scientifically accurate* personality test in the multiverse.
          <br />
          <span className="text-xs">*Results may vary. Science not included.</span>
        </p>
      </div>

      <Card className="mx-auto w-full max-w-4xl border-border/50 bg-card/95 backdrop-blur">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <StartQuizComponent key="start" startQuiz={startQuiz} />
          ) : isFinished ? (
            <QuizResult key="result" startAgain={startAgain} />
          ) : (
            <QuizQuestion
              key={`question-${currentQuestion}`}
              handleAnswerClick={handleAnswerClick}
              currentQuestion={currentQuestion}
              questions={quizQuestions}
              totalQuestions={quizQuestions.length}
              selectedAnswer={selectedAnswer}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
      </Card>
    </main>
  )
}

function StartQuizComponent({ startQuiz }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ready to discover your true self?</CardTitle>
        <CardDescription>
          Take this quiz to find out which dimension's character you are!
          <br />
          (Spoiler: It's definitely not going to be Rick)
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
        <div className="rounded-full bg-primary/20 p-6">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <p className="text-lg">
            Answer a few simple questions and we'll analyze your interdimensional psyche to determine which version of
            Smith you truly are.
          </p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "The results are more accurate than my Plumbus detector!" - Rick Sanchez, probably
          </blockquote>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8">
        <Button size="lg" className="gap-2 px-8 text-lg" onClick={startQuiz}>
          <Rocket className="h-5 w-5" />
          Start Quiz
        </Button>
      </CardFooter>
    </motion.div>
  )
}

function QuizQuestion({ questions, handleAnswerClick, currentQuestion, totalQuestions, selectedAnswer, isLoading }) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <CardHeader>
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="mt-4 text-center text-2xl">{questions[currentQuestion].question}</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {questions[currentQuestion].answers.map((answer, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative cursor-pointer overflow-hidden rounded-lg border-2 transition-colors
                ${selectedAnswer === i ? "border-primary" : "border-transparent hover:border-primary/50"}
              `}
              onClick={() => !isLoading && handleAnswerClick(i)}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={answer.imgUrl || "/placeholder.svg"}
                  alt={answer.text}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  loading="eager"
                />
              </div>
              <div className="bg-card p-3 text-center">
                <span className="font-medium">{answer.text}</span>
              </div>

              {selectedAnswer === i && isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </motion.div>
  )
}

function QuizResult({ startAgain }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Laugh className="h-6 w-6 text-primary" />
          Results Are In!
        </CardTitle>
        <CardDescription>After careful analysis of your answers...</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold sm:text-3xl"
        >
          You're Jerry!
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="max-w-md text-lg text-muted-foreground"
        >
          The universe may ignore you, but don't worry, you're still... there. Sort of.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="relative max-w-sm overflow-hidden rounded-lg border-4 border-primary/20 shadow-lg"
        >
          <img src={JerryImg || "/placeholder.svg"} alt="Jerry Smith with a puppet" className="w-full" />
          <div className="absolute inset-0 rounded-lg ring-4 ring-primary/10 ring-offset-2 ring-offset-background/50" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="max-w-md text-sm italic text-muted-foreground"
        >
          "Being a Jerry isn't so bad. At least you're not a Jerry from dimension J-19-Zeta-7. Those guys are the
          worst!"
        </motion.div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8">
        <Button size="lg" onClick={startAgain} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again, Jerry!
        </Button>
      </CardFooter>
    </motion.div>
  )
}

export default Quiz

