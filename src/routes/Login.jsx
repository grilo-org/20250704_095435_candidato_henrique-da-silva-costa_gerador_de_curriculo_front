import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginHome from '../LoginHome'
import Cadastro from '../Cadastro'
import Verificaremail from '../pages/Verificaremail'
import RecuperarSenha from '../pages/recuperarSenha'

const Login = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginHome />} />
                    <Route path="/cadastrar" element={<Cadastro />} />
                    <Route path="/verificaremail" element={<Verificaremail />} />
                    <Route path="/recuperarSenha" element={<RecuperarSenha />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login
