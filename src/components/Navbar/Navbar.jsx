import React from 'react'
import styles from './Navbar.module.css'
// import './Navbar.css'
import NavMenu from './NavMenu.jsx'

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>TypeSprint</div>
      <div className={styles.menu}>
        <NavMenu name="Practice Scrips"/>
        <NavMenu name="Multiplayer"/>
      </div>
      <div className={styles.settings}>
        <p>About</p>
      </div>

    </div>
  )
}

export default Navbar