import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import { Usuario } from '../contexts/Usuario'
import Pdf from '../pdf/Pdf'
import Curriculos from '../pages/Curriculos'

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