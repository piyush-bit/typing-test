import React from 'react'

const sloksCount = [
  48, 73, 44, 43, 30, 48, 31,
  29, 35, 43, 56, 21, 36, 28,
  21, 25, 29, 79
]

function SetChapter({verse,setVerse}) {

    const nextclickhandler = (e) => {
        
    }

    const prevclickhandler = (e) => {
        
    }

  return (
    <div>
        <button onClick={prevclickhandler}>Previous</button>
        <p>{verse[0]+1}</p>
        <button onClick={nextclickhandler}>Next</button>
        <button onClick={prevclickhandler}>Previous</button>
        <p>{verse[1]+1}</p>
        <button onClick={nextclickhandler}>Next</button>
    </div>
  )
}

export default SetChapter