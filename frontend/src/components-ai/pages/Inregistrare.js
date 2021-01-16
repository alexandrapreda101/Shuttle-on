import React, { useState } from 'react';
import '../../App.css';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import './Inregistrare.css';

function Inregistrare() {
    // Declare a new state variable, which we'll call "count"
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let history = useHistory();

    const handleChangeUsername = (e) => {
        setUserName(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const fctInreg = () => {
        Axios.post('http://localhost:3001/inregistrare',
            { username: username, email: email, password: password }).then((response) => {
                console.log(response);
                history.push('/');
            })

        if (validare() == true) {
            history.push('/')
            // window.location.reload();
            alert('Contul a fost creat! Puteti sa va autentificati!')
        }
    }

    function validare() {
        // Username
        if (username.replace(/\s/g, "").length < 3 ||
            username.replace(/\s/g, "").length > 15) {
            alert('Numele de utilizator trebuie sa aiba cel putin 3 caractere')
            return false;
        }

        // Email
        if (!email.includes('@')) {
            alert('Email-ul nu este valid')
            return false;
        }

        // Password
        if (password.replace(/\s/g, "").length <= 7) {
            alert('Parola trebuie sa aiaba cel putin 8 caractere')
            return false;
        }

        // Confirm password
        if (password !== confirmPassword) {
            alert('Parolele nu coincid')
            return false;
        }

        return true
    }


    return (
        <div className='inregistrare'>
            <h1 name={'Inregistrare'} />

            <form>
                <div class="con">
                    <header class="head-form">
                        <h2>Inregistrati-va!</h2>
                        <p>Completati formularul de mai jos cu datele dumneavoastra.</p>
                    </header>
                </div>

                <div class="field-set">

                    <input class="form-input" id="username" type="text" placeholder="Username" onChange={handleChangeUsername}></input>
                    <input class="form-input" id="email" type="text" placeholder="Email" onChange={handleChangeEmail}></input>

                    <input class="form-input" type="password" placeholder="Parola" id="password" name="password" onChange={handleChangePassword} />
                    <input class="form-input" type="password" placeholder="Confirmare Parola" id="confirmPassword" name="confirm password" onChange={handleChangeConfirmPassword} />

                </div>

                <button class="log-in" id="btnSignUp" onClick={validare, fctInreg}> Inregistrare </button>
            </form>

        </div>
    );
}

export default Inregistrare;
