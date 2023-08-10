import React from 'react'
import styles from './Counter.module.css'
function Counter(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{props.value}</p>
      </div>
      <p>{props.name}</p>
    </div>
  )
}

export default Counter