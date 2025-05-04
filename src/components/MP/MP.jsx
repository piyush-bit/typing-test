import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './MP.module.css'
import RoomView from './RoomView'
import GameView from './GameView'

function MP() {
  const [roomId, setRoomId] = useState('')
  const [socket, setSocket] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [currentRoom, setCurrentRoom] = useState(null)
  const [users, setUsers] = useState([])
  const [creator, setCreator] = useState(null)
  const [gameState, setGameState] = useState({
    isStarted: false,
    text: '',
    countdown: null,
    startTime : 0
  })

  const handleCreateRoom = () => {
    if (socket && roomId) {
      socket.emit('room:create', roomId)
    }
  }

  const handleJoinRoom = () => {
    if (socket && roomId) {
      socket.emit('room:join', roomId)
    }
  }

  const handleLeaveRoom = () => {
    if (socket && currentRoom) {
      socket.emit('room:leave', currentRoom)
      setCurrentRoom(null)
      setUsers([])
    }
  }

  const handleStartGame = () => {
    if (socket && currentRoom) {
      socket.emit('game:start', currentRoom)
    }
  }

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL,{
      transports: ["websocket"],  // ✅ here is where it matters
      upgrade: false,             // optional: prevent fallback
      withCredentials: false
    })

    newSocket.on('connect', () => {
      setConnectionStatus('connected')
      console.log('Connected to server')
    })

    newSocket.on('connect_error', (e) => {
      console.log(e);
      
      setConnectionStatus('failed')
      console.log('Failed to connect')
    })

    newSocket.on('disconnect', (e) => {
      console.log(e);
      setConnectionStatus('failed')
      console.log('Disconnected from server')
    })

    newSocket.on('room:create:success', (data) => {
      console.log('Room created:', data)
      setCurrentRoom(data.roomId)
    })

    newSocket.on('room:create:error', (data) => {
      console.log('Failed to create room:', data)
    })

    newSocket.on('room:join:success', (data) => {
      console.log('Joined room:', data)
      setCurrentRoom(data.roomId)
    })

    newSocket.on('room:join:error', (data) => {
      console.log('Failed to join room:', data)
    })

    newSocket.on('room:user:joined', (data) => {
      console.log('User joined:', data)
      setUsers(data.users)
      setCreator(data.creator)
    })

    newSocket.on('room:user:left', (updatedUsers) => {
      console.log('User left, updated users:', updatedUsers)
      setUsers(updatedUsers)
    })

    newSocket.on('game:text', (text) => {
      console.log('Received game text:', text)
      setGameState(prev => ({
        ...prev,
        text
      }))
    })

    newSocket.on('game:countdown', (count) => {
      console.log('Countdown:', count)
      setGameState(prev => ({
        ...prev,
        countdown: count
      }))
    })

    newSocket.on('game:start', (gameState) => {
      console.log('Game starting:', gameState)
      setGameState(prev => ({
        ...prev,
        isStarted: true,
        countdown: null,
        startTime: Date.now()
      }))
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#4CAF50' // green
      case 'connecting':
        return '#FFC107' // yellow
      case 'failed':
        return '#F44336' // red
      default:
        return '#FFC107'
    }
  }

  if (currentRoom) {
    if (gameState.isStarted || gameState.text) {
      return (
        <div className={styles.container}>
          <p>TYPING SPEED TEST</p>
          <h2>Multiplayer Mode</h2>
          <GameView 
            roomId={currentRoom}
            users={users}
            creator={creator}
            text={gameState.text.split(' ')}
            countdown={gameState.countdown}
            isStarted={gameState.isStarted}
            startTime={gameState.startTime}
            socket={socket}
            handleRestart={handleStartGame}
          />
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <p>TYPING SPEED TEST</p>
        <h2>Multiplayer Mode</h2>
        <RoomView 
          roomId={currentRoom}
          users={users}
          onLeave={handleLeaveRoom}
          creator={creator}
          onStart={handleStartGame}
          socket={socket}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <p>TYPING SPEED TEST</p>
      <h2>Multiplayer Mode</h2>
      <div className={styles.statusContainer}>
        <div 
          className={styles.statusIndicator} 
          style={{ backgroundColor: getStatusColor() }}
        />
        <span>Status: {connectionStatus}</span>
      </div>
      <div className={styles.controls}>
        <input 
          type="text" 
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button 
            className={styles.button}
            disabled={connectionStatus !== 'connected' || !roomId}
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
          <button 
            className={styles.button}
            disabled={connectionStatus !== 'connected' || !roomId}
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  )
}

export default MP