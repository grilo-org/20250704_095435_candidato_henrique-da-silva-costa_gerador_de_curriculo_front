import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginHome from '../LoginHome'
import Cadastro from '../Cadastro'

const Login = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginHome />} />
                    <Route path="/cadastrar" element={<Cadastro />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login
