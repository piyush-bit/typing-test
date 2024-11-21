import React, { useState, useEffect } from 'react';
import Timer from '../main/Timer';
import Counter from '../main/Counter';
import styles from './BG.module.css';
import SpeedText from '../SpeedText';
import ScriptureResultCard from './ResultCard';
import { createPortal } from 'react-dom';

function BG() {
    const [wpm, setWpm] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [timer, setTimer] = useState(0);
    const [started, setStarted] = useState(false);
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const [text, setText] = useState([]);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tries, setTries] = useState(0);
    const [response, setResponse] = useState()

    const sloksCount = [
        48, 73, 44, 43, 30, 48, 31,
        29, 35, 43, 56, 21, 36, 28,
        21, 25, 29, 79
    ];

    // Fetch the JSON for the current chapter and verse
    useEffect(() => {
        const fetchVerse = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch(`/geeta_slokas/Chapter_${chapter}/${chapter}.${verse}.json`);
                const data = await response.json();
                setResponse(data);
                setText(cleanInput(data.siva.et)); // Set the text from JSON
            } catch (error) {
                console.error("Error fetching verse:", error);
                setText(cleanInput("Error loading verse. Please try again."));
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchVerse();
    }, [chapter, verse]);

    useEffect(()=>{
        let interval;
        if(end){
            return;
        }
        if (started) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    },[timer,started]);

    // Handle next verse
    const nextVerse = () => {
        if (verse < sloksCount[chapter - 1]) {
            setVerse(verse + 1);
        } else if (chapter < 18) {
            setChapter(chapter + 1);
            setVerse(1);
        }
    };

    const reset = () => {
        setTimer(0);
        setStarted(false);
        setAccuracy(0);
        setWpm(0);
        setCpm(0);
        setEnd(false);
        setTries(tries+1);

    }


    // Handle previous verse
    const prevVerse = () => {
        if (verse > 1) {
            setVerse(verse - 1);
        } else if (chapter > 1) {
            setChapter(chapter - 1);
            setVerse(sloksCount[chapter - 2]);
        }
    };

    return (
        <div className={styles.container}>
            <p>GEETA SLOKA PRACTICE</p>
            <h2>Learn While Typing...</h2>
            <div className={styles.stats}>
                <div className={styles.counter}>
                    <Timer value={chapter} started={started} increment={nextVerse} decrement={prevVerse} unit={"chapter"} />
                    <Timer value={verse} started={started} increment={nextVerse} decrement={prevVerse} unit={"sloka"} />
                </div>
                <div className={styles.counter}>
                    <Counter value={timer} name={"seconds"} />
                    <Counter value={timer === 0 ? 0 : Math.round((wpm * 60) / timer)} name={"words/min"} />
                    <Counter value={timer === 0 ? 0 : Math.round((cpm * 60) / timer)} name={"chars/min"} />
                    <Counter value={accuracy} name={"% accuracy"} />
                </div>
            </div>

            {/* Loading Screen or SpeedText */}
            <div className={styles.speed}>
                {loading ? (
                    <div className={styles.loading}>Loading Sloka...</div>
                ) : (
                    <SpeedText
                        key={tries}
                        chapter={chapter}
                        verse={verse}
                        setAccuracy={setAccuracy}
                        setcpm={setCpm}
                        setwpm={setWpm}
                        started={started}
                        setStarted={setStarted}
                        text={text}
                        setEnd={setEnd}
                    />
                )}
            </div>
            {end && createPortal(<ScriptureResultCard wpm={timer === 0 ? 0 : Math.round((wpm * 60) / timer)} cpm={timer === 0 ? 0 : Math.round((cpm * 60) / timer)} Accuracy={accuracy} setReset={reset} onNextChapter={()=>{nextVerse();reset();}} scriptureData={response} />, document.getElementById('portal'))}
        </div>
    );
}



/**
 * Cleans the input string:
 * - Replaces escape sequences (like \n, \t) with spaces.
 * - Splits the string into words.
 * - Removes empty strings from the resulting array.
 * - Filters out words containing characters not found on a basic QWERTY English keyboard.
 * 
 * @param {string} input - The input string to clean.
 * @returns {string[]} - The cleaned array of words.
 */
const cleanInput = (input) => {
    // Basic QWERTY English keyboard regex: a-z, A-Z, 0-9, basic punctuation, and space
    const qwertyRegex = /^[a-zA-Z0-9.,'";!?()\-:]+$/;

    return input
        .replace(/[\n\t\r]+/g, ' ') // Replace escape sequences with space
        .split(' ')                 // Split into words
        .map(word => word.trim())   // Remove leading/trailing spaces from words
        .filter(word => word.length > 0) // Remove empty strings
        .filter(word => qwertyRegex.test(word)).slice(1); // Filter words with valid characters
};

export default BG;
