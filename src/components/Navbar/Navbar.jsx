import React from 'react'
import styles from './Navbar.module.css'
// import './Navbar.css'
import NavMenu from './NavMenu.jsx'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className={styles.container}>
      <Link className='link' to="/"><div className={styles.logo}>TypeSprint</div></Link>
      <div className={styles.menu}>
        <Link className='link' to="/bg">
          <NavMenu  name="Practice Scriptures"/>
        </Link>
        <Link className='link' to="/mp">
          <NavMenu name="Multiplayer"/>
        </Link>
      </div>
      <div className={styles.settings}>
        <p>About</p>
      </div>

    </div>
  )
}

export default Navbar