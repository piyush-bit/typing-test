import React, { useState, useEffect } from 'react'
import styles from './MP.module.css'
import MultipleSpeedText from './MultipleSpeedText'

function GameView({ roomId, users, creator, text, countdown, socket , isStarted }) {
  const [progress, setProgress] = useState({});
  const [levelmap,setLevelMap] = useState({});
  const [playerColors,SetPlayerColors] = useState({});

  useEffect(() => {
    if (!socket) return

    socket.on('game:progress', (progressData) => {
      console.log('progressData', progressData)
      const lm ={}
      Object.keys(progressData).forEach(key => {
        let user = progressData[key]
        if(!lm[user.p]){
          lm[user.p] = []
        }
        lm[user.p].push({id:key, t:user.t})
      })
      setLevelMap(lm)
      console.log(lm);
      
      setProgress(progressData)
    })

    return () => {
      socket.off('game:progress')
    }
  }, [socket])

  useEffect(() => {
    const randomColors = {}
    users.map((e,index) => {
      const hue = Math.floor(Math.random() * 360);
      randomColors[e]=`hsl(${hue}, 70%, 50%)`; 
    });
    SetPlayerColors(randomColors);
  }, [users]);



  const getCountdownColor = () => {
    switch(countdown) {
      case 3:
        return '#F44336' // red
      case 2:
        return '#FFC107' // yellow
      case 1:
        return '#4CAF50' // green
      default:
        return 'transparent'
    }
  }

  const currentUserId = socket?.id

  const incrementProgress = ()=>{
    socket.emit('game:progress', roomId)
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.roomInfo}>
          <div className={styles.roomIdBox}>
            <span className={styles.roomLabel}>ROOM ID</span>
            <span className={styles.roomValue}>{roomId}</span>
          </div>
          <div className={styles.playersContainer}>
            <span className={styles.playersLabel}>
              PLAYERS ({users.length})
            </span>
            <div className={styles.playersList}>
              {users.map((userId, index) => (
                <div 
                  key={userId} 
                  className={`${styles.playerCard} ${userId === socket?.id ? styles.currentPlayer : ''}`}
                  style={{ 
                    borderColor: playerColors[userId],
                    backgroundColor: `${playerColors[userId]}10`
                  }}
                >
                  <div className={styles.playerInfo}>
                    <div 
                      className={styles.playerDot}
                      style={{ backgroundColor: playerColors[userId] }}
                    />
                    <span className={styles.playerName}>
                      Player {index + 1}
                      {userId === creator && ' (Host)'}
                      {userId === socket?.id && ' (You)'}
                    </span>
                  </div>
                  <div className={styles.progressWrapper}>
                    <div 
                      className={styles.progressBar}
                      style={{ 
                        width: `${progress[userId]?.p*100/text.length || 0}%`,
                        backgroundColor: playerColors[userId]
                      }}
                    />
                    <span className={styles.progressText}>
                      {progress[userId]?.p*100/text.length || 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {countdown && (
          <div className={styles.trafficLightContainer}>
                <div 
                className={styles.trafficLight}
                style={{ backgroundColor: getCountdownColor() }}
                />
          </div>
        )}
      </div>
      {text && (
        <div className={styles.speed}>
          <MultipleSpeedText incrementProgress={incrementProgress} playerColors={playerColors} text={text} levelmap={levelmap} isStarted={isStarted}/>
        </div>
      )}
    </div>
  )
}

export default GameView