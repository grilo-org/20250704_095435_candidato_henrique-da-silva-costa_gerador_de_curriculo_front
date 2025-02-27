import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const nav = useNavigate();

    // useEffect(() => {
    //     setTimeout(() => {
    //         nav("/");
    //     }, 3000);
    // }, []);

    return (
        <div>Pagina não encontrada</div>
    )
}

export default NotFound