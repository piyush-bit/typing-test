import React from 'react'
import styles from './Timer.module.css'

function Timer(props) {
  console.log(props.started)
  return (
    <div className={styles.container}>
      {!props.started? <button onClick={props.decrement} className={styles.button}>-</button>:null}
      <div>
        <p className={styles.score}>{props.value}</p>
        <p className={styles.unit}>seconds</p>
      </div>
      {!props.started ? <button onClick={props.increment} className={styles.button}>+</button>:null}
    </div>
  )
}

export default Timer