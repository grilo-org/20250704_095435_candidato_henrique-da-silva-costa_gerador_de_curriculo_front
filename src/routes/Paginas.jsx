import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import { Usuario } from '../contexts/Usuario'
import Pdf from '../pdf/Pdf'

const Paginas = () => {
    const { setAuth } = useContext(Usuario);

    const sair = () => {
        setAuth(false)
        sessionStorage.setItem("usuario", "");
    }

    return (
        <>
            {/* <button onClick={sair}>SAIR</button> */}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pdf" element={<Pdf />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Paginas