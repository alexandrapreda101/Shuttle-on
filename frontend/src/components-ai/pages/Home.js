import React from 'react'
import { Switch } from 'react-router-dom'
import '../../App.css'
import HeroSection from '../HeroSection'
import Tabs from '../Tabs'
import './Home.css';

function Home() {
    return (
        <div className='home'>
            <div className='herosection'>
                <HeroSection />
            </div>

            <div className='tabs'>
                <Tabs />
            </div>
        </div>
    )
}

export default Home;