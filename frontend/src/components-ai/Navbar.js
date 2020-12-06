import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'


function Navbar() {

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className="navbar-logo" style={{ fontFamily: 'Boldenvandemo-K7dZZ' }}>
                        Shuttle On
                    </Link>

                    <ul className='nav-menu'>

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

                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
