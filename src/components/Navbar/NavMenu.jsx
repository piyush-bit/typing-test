import React from 'react'
import styles from './NavMenu.module.css'

function NavMenu(props) {
  return (
    <div className={styles.container}>
        <p>{props.name}</p>
        <img src="https://cdn-icons-png.flaticon.com/64/60/60995.png" alt="" />
    </div>
  )
}

export default NavMenu