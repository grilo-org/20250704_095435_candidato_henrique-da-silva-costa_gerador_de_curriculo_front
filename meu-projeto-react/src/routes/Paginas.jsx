import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import { Usuario } from '../contexts/Usuario'

const Paginas = () => {
    const { setAuth } = useContext(Usuario);

    return (
        <>
            <button onClick={() => setAuth(false)}>SAIR</button>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Paginas