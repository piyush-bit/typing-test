import React from 'react'
import styles from './Timer.module.css'

function Timer() {
  return (
    <div className={styles.container}>
      <p className={styles.score}>60</p>
      <p className={styles.unit}>seconds</p>
    </div>
  )
}

export default Timer