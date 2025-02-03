import axios from 'axios';
import React, { useEffect } from 'react'

const Home = () => {

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
