import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import { useContext } from 'react'
import { Usuario } from './contexts/Usuario'
import Paginas from './routes/Paginas'
import Login from './routes/Login'

function App() {
  const { auth, setAuth } = useContext(Usuario);

  return auth ? <Paginas /> : <Login />
}

export default App
