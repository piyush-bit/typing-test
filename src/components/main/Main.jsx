import React, { useState,useEffect } from 'react'
import Timer from './timer'
import Counter from './counter'
import SpeedText from '../SpeedText'
import ScoreCard from './ScoreCard'
import styles from './Main.module.css'


function Main() {

  const [testTime,setTestTime] = useState(60);
  const [wpm, setwpm]=useState(0);
  const [cpm,setcpm]=useState(0);
  const [accuracy,setAccuracy]=useState(0);
  const [timer,setTimer] = useState(testTime);
  const [started,setStarted]=useState(false);
  const [reset,setReset] = useState(0);


  useEffect(()=>{
    setwpm(0);
    setcpm(0);
    setAccuracy(0);
    setTimer(testTime);
    setStarted(false);
        
  },[reset,testTime]);
  
  useEffect(() => {
    let interval;
    
    if (timer > 0 && started) {
      interval = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer,started]);

  function changeTimerTime(direction){
    if(direction){
      if(!(testTime>=60)){
        setTestTime(testTime+15);
      }
    }else{
      if(!(testTime<=15)){
        setTestTime(testTime-15);
      }

    }
  }
  
  return (
    <>
    <div className={styles.container}>
        <p>TYPING SPEED TEST </p>
        <h2>Test your typing skills</h2>
        <div className={styles.stats}>
            <Timer value={timer} started={started} increment={()=>{changeTimerTime(true)}} decrement={()=>{changeTimerTime(false)}}/>
            <div className={styles.counter}>
            <Counter value={testTime==timer?0:Math.round(wpm*60/(testTime-timer))} name={"words/min"}/>
            <Counter value={testTime==timer?0:Math.round(cpm*60/(testTime-timer))} name={"chars/min"}/>
            <Counter value={accuracy} name={"% accuracy"}/>
            </div>
        </div>
        <div className={styles.speed}>
          <SpeedText key={reset} setAccuracy={setAccuracy} setcpm={setcpm} setwpm={setwpm} started={started} setStarted={setStarted} reset={reset}/>
        </div>
        <ScoreCard cpm={testTime==timer?0:Math.round(cpm*60/(testTime-timer))} wpm={testTime==timer?0:Math.round(wpm*60/(testTime-timer))} accuracy={accuracy} setReset={setReset} timer={timer}/>
        
    </div>
    </>
  )
}

export default Main