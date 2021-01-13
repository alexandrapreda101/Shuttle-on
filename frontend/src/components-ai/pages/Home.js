import Axios from 'axios'
import { Switch } from 'react-router-dom'
import '../../App.css'
import HeroSection from '../HeroSection'
import Tabs from '../Tabs'
import './Home.css';
import React, { useEffect, useState } from "react";

function Home() {
    const [listaRecenzii, setListaRecenzii] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/formular/findAll').then((response) => {
            setListaRecenzii(response.data);
        })
    }, [])

    return (
        <div class='home'>
            <div className='herosection'>
                <HeroSection />
            </div>
            {/* 
            <div className='tabs'>
                <Tabs />
            </div> */}
            <h2 class ="recenzieTitlu">Recenzii</h2>
            {listaRecenzii.map((val) => {
                return (
                    <div className = "recenzie">
                    Punct plecare : {val.punct_plecare} | Punct sosire : {val.punct_sosire} 
                     |  Mijloc transport: {val. mijloc_transport}| Numarul: {val.numarul}
                     |  Ora plecarii: {val.ora_plecarii}| Durata calatoriei: {val.durata_calatoriei} 
                     |  Grad aglomerare: {val.grad_aglomerare}| Nivel satisfactie: {val.nivel_satisfactie}
                     |  Alte comentarii:  {val.alte_comentarii} |User: {val.user.username}</div>
                )
            })}
        </div>
    )
}

export default Home;