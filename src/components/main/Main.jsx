import React, { useState,useEffect } from 'react'
import Timer from './timer'
import Counter from './counter'
import SpeedText from '../SpeedText'
import ScoreCard from './ScoreCard'
import styles from './Main.module.css'


function Main() {

  const [wpm, setwpm]=useState(0);
  const [cpm,setcpm]=useState(0);
  const [accuracy,setAccuracy]=useState(0);
  const [timer,setTimer] = useState(60);
  const [started,setStarted]=useState(false);
  const [reset,setReset] = useState(0);


  useEffect(()=>{
    setwpm(0);
    setcpm(0);
    setAccuracy(0);
    setTimer(60);
    setStarted(false);
        
  },[reset]);
  
  useEffect(() => {
    let interval;
    
    if (timer > 0 && started) {
      interval = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer,started]);
  
  return (
    <>
    <div className={styles.container}>
        <p>TYPING SPEED TEST </p>
        <h2>Test your typing skills</h2>
        <div className={styles.stats}>
            <Timer value={timer}/>
            <div className={styles.counter}>
            <Counter value={wpm} name={"words/min"}/>
            <Counter value={cpm} name={"chars/min"}/>
            <Counter value={accuracy} name={"% accuracy"}/>
            </div>
        </div>
        <div className={styles.speed}>
          <SpeedText key={reset} setAccuracy={setAccuracy} setcpm={setcpm} setwpm={setwpm} started={started} setStarted={setStarted} reset={reset}/>
        </div>
        <ScoreCard cpm={cpm} wpm={wpm} accuracy={accuracy} setReset={setReset} timer={timer}/>
        
    </div>
    </>
  )
}

export default Main