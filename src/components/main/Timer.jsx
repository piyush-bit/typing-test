import React from 'react'
import styles from './Timer.module.css'

function Timer(props) {
  return (
    <div className={styles.container}>
      <p className={styles.score}>{props.value}</p>
      <p className={styles.unit}>seconds</p>
    </div>
  )
}

export default Timer