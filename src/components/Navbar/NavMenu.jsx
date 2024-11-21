import React from 'react'
import styles from './NavMenu.module.css'

function NavMenu(props) {
  return (
    <div className={styles.container}>
        <p>{props.name}</p>
    </div>
  )
}

export default NavMenu