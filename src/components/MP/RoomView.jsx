import React from 'react'
import styles from './MP.module.css'

function RoomView({ roomId, users, onLeave, creator, onStart, socket }) {
  // Get current user's socket ID
  const currentUserId = socket?.id
  const isCreator = currentUserId === creator

  return (
    <div className={styles.roomContainer}>
      <h3>Room: {roomId}</h3>
      <div className={styles.userList}>
        <h4>Players ({users.length}/2)</h4>
        {users.map((userId, index) => (
          <div 
            key={userId} 
            className={`${styles.userItem} ${userId === currentUserId ? styles.currentUser : ''}`}
          >
            Player {index + 1}: {userId}
            {userId === creator && ' (Host)'}
            {userId === currentUserId && ' (You)'}
          </div>
        ))}
      </div>
      <div className={styles.roomControls}>
        {isCreator && users.length >= 2 && (
          <button 
            className={`${styles.button} ${styles.startButton}`}
            onClick={onStart}
          >
            Start Game
          </button>
        )}
        <button 
          className={styles.button}
          onClick={onLeave}
        >
          Leave Room
        </button>
      </div>
    </div>
  )
}

export default RoomView 