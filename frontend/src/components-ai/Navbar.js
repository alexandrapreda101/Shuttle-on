import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { Button } from './Button'
import Axios from 'axios';

function Navbar() {

    const [LogInStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    let history = useHistory();

    useEffect(() => {
        Axios.get("http://localhost:3001/autentificare").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user.username)
            }
        })
    }, [])


    const logOut = () => {

        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });


        history.push('/')
        window.location.reload();

    }


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className="navbar-logo" style={{ fontFamily: 'Boldenvandemo-K7dZZ' }}>
                        Shuttle On
                    </Link>

                    <ul className='nav-menu'>

                        {LogInStatus && (

                            <li className='nav-item'>

                                Buna, {LogInStatus}!

                                <Link to='/recenzii'
                                    className='btn btn--outline btn--medium'
                                    style={{ textDecoration: 'none' }}>
                                    Profilul meu
                            </Link>

                                <Link onClick={logOut}
                                    className='btn btn--primary btn--medium'
                                    style={{ textDecoration: 'none' }}>
                                    Log Out!
                            </Link>
                            </li>)}


                        {!LogInStatus && (

                            <li className='nav-item'>


                                <Link to='/autentificare'
                                    className='btn btn--outline btn--medium'
                                    style={{ textDecoration: 'none' }}>
                                    Autentificare!
                            </Link>

                                <Link to='/inregistrare'
                                    className='btn btn--primary btn--medium'
                                    style={{ textDecoration: 'none' }}>
                                    Înregistrează-te!
                            </Link>

                            </li>)}

                        {/* <li className='nav-item'>
                            
                            
                            <Link to='/autentificare'
                                className='btn btn--outline btn--medium'
                                style={{ textDecoration: 'none' }}>
                                Autentificare!
                            </Link>

                            <Link to='/inregistrare'
                                className='btn btn--primary btn--medium'
                                style={{ textDecoration: 'none' }}>
                                Înregistrează-te!
                            </Link>

                        </li> */}


                    </ul>
                </div>
            </nav>
        </>
    )


}

export default Navbar
