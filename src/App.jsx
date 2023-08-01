import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

    const text = "DevSecOps is an augmentation of DevOps to allow for security practices to be integrated into the DevOps approach. Contrary to a traditional centralized security team model, each delivery team is empowered to factor in the correct security controls into their software delivery. Security practices and testing are performed earlier in the development lifecycle, hence the term \"shift left\". Security is tested in three main areas: static, software composition, and dynamic."
        .split(' ');
    const [index, setIndex] = useState(0);
    const [comming, setComming] = useState(text);
    const [done, setDone] = useState([]);
    const [correct, setCorrect] = useState([true]);

    const curr = text[index];

    useEffect(() => {
        setComming([...text.slice(index)]);
    }, [index])



    const onChangeHandler = (e) => {



        let input = e.target.textContent;
        let word = text[index];

        console.log(input + ' : Input');
        console.log(done.slice(-1));

        // Use a regular expression to check for any whitespace character (including nbsp) at the beginning
        if (/^\s/.test(input)) {
            // Remove space at the front of the input
            e.target.textContent = input.replace(/^\s+/, '');
            return;
        }
        else if (/\s$/.test(input)) {
            // Use a regular expression to check for any whitespace character (including nbsp) at the end
            // Treat spaces after a word as a submission trigger
            const trimmedInput = input.trim();
            setCorrect(prev => { return [...(prev.slice(0, -1)), trimmedInput === word, true] });

            setDone((prev) => [...(prev.slice(0, -1)), word, '']);
            setIndex((prev) => prev + 1);
            e.target.textContent = '';


        }


        else {
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
            console.log(correct);


        }



    };




    const classgenrator = (a) => {
        console.log(a)
        switch (a) {
            case true: return "correct";
            case false: return "wrong";
            default: return "default";
        }
    }


    return (
        <div className="container">
            <div className="done">
                {done.map((element, index) => { return <span className={classgenrator(correct[index])} key={index}>{element}</span> })}
                <div className="cursor" onInput={onChangeHandler} contentEditable="true"></div>
            </div>

            <div className="comming">{comming.map((element, index) => { return <span key={index}>{element}</span> })}</div>
        </div>
    )
}

export default App