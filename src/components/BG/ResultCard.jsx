import React from 'react';
import styles from './ScriptureResultCard.module.css';

function ScriptureResultCard(props) {
    const { 
        wpm , 
        cpm, 
        accuracy, 
        scriptureData,
        timer,
        setReset,
        onNextChapter
    } = props;


    if(timer > 0){
        return null;
    }

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div 
                    onClick={() => setReset && setReset()} 
                    className={styles.closeIcon}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className={styles.performanceSection}>
                    <h2>Your Performance</h2>
                    <div className={styles.performanceGrid}>
                        <div>
                            <div>WPM</div>
                            <div>{wpm}</div>
                        </div>
                        <div>
                            <div>CPM</div>
                            <div>{cpm}</div>
                        </div>
                        <div>
                            <div>Accuracy</div>
                            <div>{accuracy}%</div>
                        </div>
                    </div>
                </div>

                <div className={styles.scriptureSection}>
                    <h3>
                        Chapter {scriptureData.chapter}, Verse {scriptureData.verse}
                    </h3>
                    <div className={styles.originalScript}>
                        <p>{scriptureData.slok}</p>
                    </div>
                    <div>
                        <h4>Translation</h4>
                        <p>{scriptureData.siva.et}</p>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button 
                        onClick={() => setReset && setReset()} 
                        className={styles.retryBtn}
                    >
                        Retry Chapter
                    </button>
                    <button 
                        onClick={() => onNextChapter && onNextChapter()} 
                        className={styles.nextBtn}
                    >
                        Next Chapter
                    </button>
                </div>
            </div>
        </>
    );
}

export default ScriptureResultCard;