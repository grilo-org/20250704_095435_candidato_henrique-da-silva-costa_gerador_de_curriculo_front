import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginHome from '../LoginHome'

const Login = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginHome />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login
