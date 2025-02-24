import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Curriculos from '../pages/Curriculos'
import Pdf from '../pdf/Pdf'

const Paginas = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pdf" element={<Pdf />} />
                    <Route path="/curriculos" element={<Curriculos />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Paginas