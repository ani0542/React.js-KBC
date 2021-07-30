import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";



function Quiz({questionNumber,data,setStop,setQuestionNumber}) {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);


    useEffect(()=>{
        letsPlay()
    },[letsPlay])

    useEffect(()=>{
        setQuestion(data[questionNumber-1])
    },[questionNumber,data])

   

    // console.log(question)
    // console.log(selectedAnswer)

    const handleClick=(value)=>{
        // console.log(value)
        setSelectedAnswer(value)
        setClassName('answer active')
        setTimeout(()=>{
            setClassName(value.correct ? 'answer correct' : 'answer wrong')
        },3000)
        setTimeout(()=>{
              if(value.correct) {
               
                correctAnswer();
                setTimeout(()=>{
                    setQuestionNumber((prev)=>prev+1)
                    setSelectedAnswer(null)
                },2000)
              }
              else{
                wrongAnswer()

                setTimeout(()=>{
                  
                    setStop(true)
                },2000)
              }
        },6000)
    }

    const rendermap =(value)=>{
        // console.log(value)
        return (
            <div className={selectedAnswer===value ? className : 'answer'} onClick={()=>handleClick(value)}>{value.text}</div>
        )
    }
    return (
        <>
            <div className='trivia'>
                   <div className='question'>{question?.question}</div>
                   <div className='answers'>
                          {question?.answers?.map(rendermap)}  
                   </div>
            </div>
        </>
    )
}

export default Quiz
