import React from 'react'
import styles from './Navbar.module.css'
// import './Navbar.css'
import NavMenu from './NavMenu.jsx'

function Navbar() {
  return (
    <div className={styles.container}>
      <img src="https://www.livechat.com/livechat-logo.svg" alt="" className={styles.logo} />
      <div className={styles.menu}>

        <NavMenu name="Product"/>
        <NavMenu name="Pricing"/>
        <NavMenu name="Marketplace"/>
        <NavMenu name="Customers"/>
        <NavMenu name="Support"/>
        
      </div>
      <div className={styles.settings}>
        <p>Settings</p>
      </div>

    </div>
  )
}

export default Navbar