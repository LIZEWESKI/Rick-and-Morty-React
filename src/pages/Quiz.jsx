import React, { useState } from 'react'
import quizQuestions from "../utils/quizQuestions"
import JerryImg from "../assets/Jerry-result.webp"
import "./Quiz.css"
const Quiz = () => {
    const [isStarted,setIsStarted] = useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [isFinished,setIsFinished] = useState(false)
    const startQuiz = () => setIsStarted(true)
    const nextQuestion = () => setCurrentQuestion(prevQuestion => {
        if(prevQuestion + 1 === quizQuestions.length) {
            setIsFinished(true)
            return 0
        } else {
            return prevQuestion + 1
        }
    })
    const startAgain = ()=> {
        setIsStarted(false)
        setIsFinished(false)
    }
    return (
        <main className='quiz_main'>
        <h1>Discover Your Jerry Personality!</h1>
        <div className="quiz_wrapper">
            {!isStarted ? <StartQuizComponent startQuiz={startQuiz}/> 
            : isFinished ? <QuizResult startAgain={startAgain}/> :  
            <QuizQuestion nextQuestion={nextQuestion} currentQuestion={currentQuestion} questions={quizQuestions}/>}
        </div>
    </main>
  )
}
function StartQuizComponent({startQuiz}){
    return (
        <>
            <h2>Take the quiz to find out which dimension's character you are!</h2>
            <button className='quiz_start--btn' onClick={startQuiz}>Start</button>
        </>
    )
}

function QuizQuestion({ questions,nextQuestion, currentQuestion}) {
    return (
        <div>
            <h2>{questions[currentQuestion].question}</h2>
            <div className="answers_wrapper">
                {questions[currentQuestion].answers.map((answer, i) => {
                    return (
                        <div 
                            key={i} 
                            className="answer_option" 
                            onClick={nextQuestion}  // Move to the next question on image click
                        >
                            <div className="answer_image_container">
                                <img src={answer.imgUrl} alt={answer.text} className="answer_image" />
                            </div>
                            <span>{answer.text}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
function QuizResult({ startAgain }) {
    return (
        <div className="quiz_result">
            <h2>You’re Jerry! The universe may ignore you, but don’t worry, you’re still... there. Sort of. xD</h2>
            <img src={JerryImg} alt="" />
            <button className='quiz_start--btn' onClick={startAgain}>Try Again Jerry!</button>
        </div>
    );
}

export default Quiz