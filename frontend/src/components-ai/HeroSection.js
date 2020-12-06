import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'


function HeroSection() {
    return (
        <div className='hero-container'>
            {/*<video src="/cover-mainpage.mp4" autoPlay loop muted />*/}
            <img src="/cover-photo5.jpg" />
            <h1>
                Shuttle On
            </h1>
            <div className='hero-btns'>
                <Link to='/formular'
                    className='btn btn--primary btn--medium'
                    style={{ textDecoration: 'none' }}>
                    Scrie o recenzie!
                </Link>

            </div>
        </div>
    )
}


export default HeroSection
