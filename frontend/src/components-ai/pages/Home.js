import Axios from 'axios'
import { Switch } from 'react-router-dom'
import '../../App.css'
import HeroSection from '../HeroSection'
import Tabs from '../Tabs'
import './Home.css';
import React, { useEffect, useState } from "react";

function Home() {
    const [listaRecenzii, setListaRecenzii] = useState([]);
    const [cautareCuvant, setCautareCuvant] = useState('');
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

            <h1 class="recenzieTitlu">Recenzii</h1>

            <div class="searchFilter">
                <input type="text" class="search" placeholder="Search..."
                    onChange={event => setCautareCuvant(event.target.value)}></input>
            </div>

            {listaRecenzii.map((val, key) => {
                if (cautareCuvant == "") {

                    return <div className="recenzie" key={key}>
                        <span ><strong>Punct plecare :</strong></span> {val.punct_plecare}<span className="spans"><strong> Punct sosire : </strong></span>{val.punct_sosire}
                        <span className="spans"><strong>  Mijloc transport: </strong></span>{val.mijloc_transport}<span className="spans"><strong> Numarul: </strong></span>{val.numarul}
                        <span ><strong> <br></br> Grad Aglomerare: </strong></span> {val.grad_aglomerare}<span className="otherspans"><strong> Durata calatoriei: </strong></span>{val.durata_calatoriei}
                        <span className="otherspans"><strong>  Ora plecarii:</strong></span> {val.ora_plecarii}<span className="otherspans"><strong> Nivel satisfactie:</strong></span> {val.nivel_satisfactie}
                        <br></br><span ><strong> Alte comentarii:</strong></span>  {val.alte_comentarii}</div>;
                }
                else if (val.punct_plecare.toLowerCase().includes(cautareCuvant.toLowerCase()) ||
                    val.punct_plecare.toLowerCase().includes(cautareCuvant.toLowerCase()) ||
                    val.punct_sosire.toLowerCase().includes(cautareCuvant.toLowerCase()) ||
                    val.mijloc_transport.toLowerCase().includes(cautareCuvant.toLowerCase()) ||
                    val.numarul.toLowerCase().includes(cautareCuvant.toLowerCase())) {

                    return <div className="recenzie" key={key}>
                        <span ><strong>Punct plecare :</strong></span> {val.punct_plecare}<span className="spans"><strong> Punct sosire : </strong></span>{val.punct_sosire}
                        <span className="spans"><strong>  Mijloc transport: </strong></span>{val.mijloc_transport}<span className="spans"><strong> Numarul: </strong></span>{val.numarul}
                        <span ><strong> <br></br> Grad Aglomerare: </strong></span> {val.grad_aglomerare}<span className="otherspans"><strong> Durata calatoriei: </strong></span>{val.durata_calatoriei}
                        <span className="otherspans"><strong>  Ora plecarii:</strong></span> {val.ora_plecarii}<span className="otherspans"><strong> Nivel satisfactie:</strong></span> {val.nivel_satisfactie}
                        <br></br><span ><strong> Alte comentarii:</strong></span>  {val.alte_comentarii}</div>;
                }
            })}
        </div>
    )
}

export default Home;