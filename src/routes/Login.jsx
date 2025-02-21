import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginHome from '../LoginHome'
import CadastrarUsuario from '../CadastrarUsuario'
import Verificaremail from '../pages/Verificaremail'
import RecuperarSenha from '../pages/RecuperarSenha'

const Login = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginHome />} />
                    <Route path="/cadastrar" element={<CadastrarUsuario />} />
                    <Route path="/verificaremail" element={<Verificaremail />} />
                    <Route path="/recuperarSenha" element={<RecuperarSenha />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login
