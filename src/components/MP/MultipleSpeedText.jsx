import React, { useEffect, useState, useRef } from 'react'
import styles from './MSpeedText.module.css'

function MultipleSpeedText(props) {
    // console.log(props.text);
    
    const [text, setText] = useState(props.text);
    const [index, setIndex] = useState(0);
    const [comming, setComming] = useState(text);
    const [done, setDone] = useState([]);
    const [correct, setCorrect] = useState([true]);
    const startTimeRef = useRef(null);
    const [speed, setSpeed] = useState([]);
    const [completed, setCompleted] = useState(false)
    const ref = useRef(null);


    useEffect(() => {
        setComming([...text.slice(index)]);
        startTimeRef.current=new Date().getTime();
        if(index==text.length){
            setCompleted(true);
            props.setCompleted(true);
            
            
            console.log("end");
            
        }
        console.log(index);
        
        
    }, [index])

    useEffect(()=>{
        if(props.isStarted){
            ref.current.focus();
        }

    },[props.isStarted])


    const FocusChild = () => { ref.current.focus() };

    const onKeyDownHandler = function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
        }
    };

    const onChangeHandler = (e) => {
        let input = e.target.textContent;
        let word = text[index];
        if(!props.isStarted){
            e.target.textContent = '';
            return;
        }

        // Use a regular expression to check for any whitespace character (including nbsp) at the beginning
        if (/^\s/.test(input)) {
            e.target.textContent = input.replace(/^\s+/, '');
            return;
        }
        else{
            const trimmedInput = input
            console.log("over");
            
            // setCorrect(prev => { return [...(prev.slice(0, -1)), trimmedInput === word, true] });
            if (trimmedInput === word) {
                setCorrect(prev => { return [...(prev.slice(0, -1)), trimmedInput === word, true] });
                setDone((prev) => [...(prev.slice(0, -1)), input, '']);
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
                props.incrementProgress();
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
                            <div className={styles.speed}>
                                {speed[index]}
                                {props.levelmap[index+1]?.map((e)=>{
                                    return <div className={styles.dot} style={{backgroundColor:props.playerColors[e.id]}}></div>
                                    
                                })}

                            </div>
                        </div>

                })}
                <div className={styles.cursor} ref={ref} onKeyDown={onKeyDownHandler} onInput={onChangeHandler} contentEditable={!completed}></div>
            </div>
            <div className={styles.comming}>{comming.map((element, i) => { return <div className={styles.commingcotnainer}>
                <span key={i}>{element}</span>
                <div className={styles.speed}>
                    {i==0 && props.levelmap[index+i+1]?.map((e)=>{
                        return <div className={styles.dot} style={{backgroundColor:props.playerColors[e.id]}}></div>
                    })}
                </div>
            </div>
        
        })}</div>
        </div>
    )
}

export default MultipleSpeedText