import React from 'react'
import Timer from './timer'
import Counter from './counter'
import SpeedText from '../SpeedText'

import styles from './Main.module.css'

function Main() {
  return (
    <>
    <div className={styles.container}>
        <p>TYPING SPEED TEST </p>
        <h2>Test your typing skills</h2>
        <div className={styles.stats}>
            <Timer/>
            <div className={styles.counter}>
            <Counter/>
            <Counter/>
            <Counter/>
            </div>
        </div>
        <div className={styles.speed}>
          <SpeedText/>
        </div>
        
        
    </div>
    </>
  )
}

export default Main