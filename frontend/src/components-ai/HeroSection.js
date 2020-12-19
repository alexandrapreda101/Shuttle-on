import '../App.css'
import { Button } from './Button'
import './HeroSection.css'
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios';


function HeroSection() {

    const [LogInStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    let history = useHistory();

    useEffect(() => {
        Axios.get("http://localhost:3001/autentificare").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(true)
            }
        })
    }, [])

    function isLoggedIn() {
        alert("Autentificati-va pentru a putea posta o recenzie!")
    }

    return (
        <div className='hero-container'>
            {/*<video src="/cover-mainpage.mp4" autoPlay loop muted />*/}
            <img src="/cover-photo5.jpg" />
            <h1>
                Shuttle On
            </h1>
            <div className='hero-btns'>
                {LogInStatus && (
                    <Link to='/formular'
                        className='btn btn--primary btn--medium'
                        style={{ textDecoration: 'none' }}>
                        Scrie o recenzie!
                    </Link>
                )}
                {!LogInStatus && (
                    <Link onClick={isLoggedIn}
                        className='btn btn--primary btn--medium'
                        style={{ textDecoration: 'none' }}>
                        Scrie o recenzie!
                    </Link>
                )}


            </div>
        </div>
    )
}


export default HeroSection
