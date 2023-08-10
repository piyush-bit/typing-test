import React from 'react'
import styles from './ScoreCard.module.css'
import ReactDOM from 'react-dom'

function ScoreCard(props) {

    const btnclickhandler = (e) => { props.setReset(prev => prev + 1) };
    if(props.timer>0){
        return null;
    }
    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div onClick={btnclickhandler} className={styles.cross}>
                    <img src="https://cdn-icons-png.flaticon.com/64/2976/2976286.png" alt="" />
                </div>
                <div className={styles.a}>
                    <div>
                        <img src="https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/turtle.svg" alt="" />
                    </div>
                    <div className={styles.text}>
                        <h3>You're a Turtle.</h3>
                        <p>Well... You type with the speed of <span>{props.wpm} WPM</span> ({props.cpm} CPM). Your accuracy was <span>{props.Accuracy}%</span>. It could be better!</p>
                    </div>
                </div>
                <div className={styles.b}>
                    <button onClick={btnclickhandler}>Try Again</button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ScoreCard