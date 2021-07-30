import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./App.css";
import Quiz from './Components/Quiz';
import Start from './Components/Start';
import Timer from './Components/Timer';
import {moneyPyramid} from "./Constants/Constants"
import {data} from "./Constants/DataShow"

function App() {

   const [questionNumber, setQuestionNumber] = useState(1);
   const [stop, setStop] = useState(false);
   const [earned, setEarned] = useState("$ 0");
   const [username, setUsername] = useState(null);

   const renderMap=(values)=>{
          return (
              <li className={questionNumber === values.id ? `moneyListItem active`:`moneyListItem`}>
                            <span className="moneyListItemNumber">{values.id}</span>
                            <span className="moneyListItemAmount">{values.amount}</span>
              </li>
          )
       }     

       useEffect(()=>{
              questionNumber > 1 && setEarned(moneyPyramid.find(
                     value=> value.id === questionNumber-1
              )?.amount )
       },[questionNumber])



       return (
              <>
                     <div className='app'>
                            {
                                   !username ? (
                                          <Start setUsername={setUsername}/>
                                   ):(
                                         <>
                                                         <div className="main">
                                                  {
                                                      stop ? <h1 className="endText">You earned: {earned}</h1>:(
                                                 
                                                  <>

                                                        <div className='top'>
                                                            {/* <div className='timer'>30</div> */}
                                                            <div className='timer'>
                                                                   <Timer
                                                                      setStop={setStop}
                                                                      questionNumber={questionNumber}
                                                                   />
                                                            </div>
                                                         </div>
                                                        <div className='bottom'>
                                                               <Quiz
                                                                      data={data}
                                                                      questionNumber={questionNumber}
                                                                      setStop={setStop}
                                                                      setQuestionNumber={setQuestionNumber}
                                                               />
                                                        </div>
                                                  </>
                                           )
                                    }
                                      
                             </div>
                             <div className="pyramid">
                                    <ul className="moneyList">
                                               {moneyPyramid.map(renderMap)}
                                    </ul>
                             </div>

                                         </>
                                   )
                            }
                           
                     </div>  
              </>
       )
}

export default App
