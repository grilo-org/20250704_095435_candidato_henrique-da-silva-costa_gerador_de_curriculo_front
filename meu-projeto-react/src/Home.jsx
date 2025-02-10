import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'reactstrap';

const Home = () => {
    const [usuario, setUsuario] = useState(sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : "");

    const autorizar = "Bearer " + usuario.env;

    const verificar = () => {
        axios.get("http://localhost:1999/verificartoken", {
            headers: {
                "Authorization": autorizar,
                "Content-Type": "application/json"
                // "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>{usuario.email + " " + usuario.nome}</h1>
            <Button color="success" onClick={verificar}>VERIFICAR</Button>
        </div>
    )
}

export default Home
