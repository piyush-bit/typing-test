import React, { useState, useEffect } from 'react'
import styles from './MP.module.css'
import MultipleSpeedText from './MultipleSpeedText'

function GameView({ roomId, users, creator, text, countdown, socket , isStarted , startTime , handleRestart }) {
  const [progress, setProgress] = useState({});
  const [levelmap,setLevelMap] = useState({});
  const [playerColors,SetPlayerColors] = useState({});
  const [completed, setCompleted] = useState(false);

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

  useEffect(()=>{
    setProgress({});
    setCompleted(false);
  },[text])



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

  const getCountdownText = () => {
    switch(countdown){
      case 3:
        return "Ready!"
      case 2:
        return "Get!"
      case 1:
        return "Set!"
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
                <h2 className={styles.trafficLightText}>{getCountdownText()}</h2>
          </div>
        )}
      </div>
      {text && (
        <div className={styles.speed}>
          <MultipleSpeedText key={text} incrementProgress={incrementProgress} playerColors={playerColors} text={text} levelmap={levelmap} isStarted={isStarted} setCompleted={setCompleted}/>
        </div>
      )}
      {completed && (
        <div className={styles.leaderBoard}>
          <div className={styles.leaderHeader}>
            <h2>Game Complete!</h2> 
            {socket?.id === creator && (
              <button className={styles.restartButton} onClick={handleRestart}>Restart</button>
            )}
          </div>
          <div className={styles.leaderBoardList}>
            {Object.entries(progress)
        .map(([id, value]) => ({
            id: id, 
            p: value.p, 
            t: value.t
        }))
        .sort((a, b) => {
            if (a.p !== b.p) return -a.p + b.p;
            return a.t - b.t;
        }).map((player, index) => (
              <div 
                key={player.id} 
                className={`${styles.leaderBoardItem} ${player.id === socket?.id ? styles.currentPlayerCard : ''}`}
                style={{ 
                  borderColor: playerColors[player.id],
                  backgroundColor: player.id === socket?.id 
                    ? `${playerColors[player.id]}30`
                    : `${playerColors[player.id]}10`
                }}
              >
                <div className={styles.leaderBoardRank}>
                  <span className={styles.rank}>#{index + 1}</span>
                </div>
                <div className={styles.leaderBoardDetails}>
                  <span className={styles.playerName}>
                    Player {users.indexOf(player.id) + 1}
                    {player.id === socket?.id && ' (You)'}
                  </span>
                  <span className={styles.time}>{(player.p/((player.t-startTime) / 60000)).toFixed(2)} WPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GameView