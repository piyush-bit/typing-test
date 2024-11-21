import React, { useEffect, useState, useRef } from 'react'
import styles from './SpeedText.module.css'

function SpeedText(props) {
    // console.log(props.text);
    
    const [text, setText] = useState(props.text);
    const [index, setIndex] = useState(0);
    const [comming, setComming] = useState(text);
    const [done, setDone] = useState([]);
    const [correct, setCorrect] = useState([true]);
    const startTimeRef = useRef(null);
    const lastChar = useRef(null);
    const [speed, setSpeed] = useState([]);
    const [charSpeed, setCharSpeed] = useState({});
    const ref = useRef(null);


    useEffect(() => {
        setComming([...text.slice(index)]);
        startTimeRef.current=new Date().getTime();
        if(index==text.length){
            props.setEnd(true);
            props.setStarted(false);
            console.log("end");
            
        }
        console.log(index);
        
        
    }, [index])


    const FocusChild = () => { ref.current.focus() };

    const onKeyDownHandler = function (event) {
        if (!props.started ) {
            props.setStarted(true);
            startTimeRef.current = new Date().getTime();
            lastChar.current = new Date().getTime();

        }
        if (event.key === 'Enter') {
            event.preventDefault(); 
        }
    };

    const onChangeHandler = (e) => {
        let input = e.target.textContent;
        let word = text[index];

        // Use a regular expression to check for any whitespace character (including nbsp) at the beginning
        if (/^\s/.test(input)) {
            e.target.textContent = input.replace(/^\s+/, '');
            return;
        }
        else if (/\s$/.test(input)) {
            const trimmedInput = input.trim();
            console.log("over");
            
            setCorrect(prev => { return [...(prev.slice(0, -1)), trimmedInput === word, true] });
            setDone((prev) => [...(prev.slice(0, -1)), input, '']);
            if (trimmedInput === word) {
                props.setwpm(prev => prev + 1);
                props.setcpm(prev => { return prev + word.length });
                props.setAccuracy(prev => { return Math.round(((prev * index / 100) + 1) * 100 / (index + 1)) });
            }
            else {
                props.setAccuracy(prev => { return Math.round(((prev * index / 100) + 0) * 100 / (index + 1)) })
            }
            setIndex((prev) => prev + 1);
            e.target.textContent = '';

            setSpeed(prev => {
                const currentTime = new Date().getTime();
                // console.log("current "+currentTime);
                const startTime = startTimeRef.current;
                // console.log("start Time "+startTime);
                // console.log("diff"+ (currentTime-startTime)/1000);

                 // Use start time if available
                const calculatedSpeed = 60000 / (currentTime - startTime);
                return [...prev, Math.round(calculatedSpeed)];
            });


        }
        else {
            // console.log(startTimeRef);
            let i = 0;
            while (i < input.length && i < word.length) {
                if (input[i] === word[i]) {
                    i++;
                } else {
                    break;
                }
            }

            setComming(prev => [word.slice(i), ...(prev.slice(1))]);
            setDone((prev) => {
                // Remove the last element from the array using array slicing
                const updatedPrev = prev.slice(0, -1);

                // Add the new input to the end of the updated array
                return [...updatedPrev, input];
            });

            setCorrect(prev => [...(prev.slice(0, -1)), word.startsWith(input)]);
            // console.log(correct);
        }
    };




    const classgenrator = (a) => {
        // console.log(a)
        switch (a) {
            case true: return styles.correct;
            case false: return styles.wrong;
            default: return styles.default;
        }
    }
    return (
        <div className={styles.container} onClick={FocusChild}>
            <div className={styles.done}>
                {done.map((element, index) => {
                    return <div key={index} className={styles.donecotnainer}>
                        <span className={classgenrator(correct[index])} >{element}</span>
                        <div className={styles.speed}>{speed[index]}</div>
                    </div>

                })}
                <div className={styles.cursor} ref={ref} onKeyDown={onKeyDownHandler} onInput={onChangeHandler} contentEditable="true"></div>
            </div>
            <div className={styles.comming}>{comming.map((element, index) => { return <span key={index}>{element}</span> })}</div>
        </div>
    )
}

export default SpeedText