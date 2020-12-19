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
        {username: username, email: email, password: password}).then((response) =>{
            console.log(response);
            history.push('/');
        })

        if(validare()==true){
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

            <h1>Completati formularul:</h1>
            <div className='inputText'>
                <label for="username">Username: </label>
                <input type="text" id="username" onChange={handleChangeUsername} />
                <label for="email">Email: </label>
                <input type="text" id="email" onChange={handleChangeEmail} />
                <label for="password">Password: </label>
                <input type="text" id="password" onChange={handleChangePassword} />
                <label for="confirmPassword">Confirm password: </label>
                <input type="text" id="confirmPassword" onChange={handleChangeConfirmPassword} />
            </div>

            <input type="button" value="Sign up" id="btnSignUp" onClick={validare,fctInreg}/>

        </div>
    );
}

export default Inregistrare;
