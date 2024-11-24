import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Main from './components/main/Main.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BG from './components/BG/BG.jsx'
import ScriptureResultCard from './components/BG/ResultCard.jsx'
import MP from './components/MP/MP.jsx'
function App() {

    
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/bg" element={<BG />} />
                <Route path="/mp" element={<MP/>} />
                <Route path="/test" element={<ScriptureResultCard/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App