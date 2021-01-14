import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../App.css';
import './Profil.css';
import Axios from 'axios';


export default function Profil() {

  const [LogInStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/autentificare").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.username)
      }
    })
  }, [])

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

  // const fctInreg = () => {
  //     Axios.post('http://localhost:3001/inregistrare', 
  //     {username: username, email: email, password: password}).then((response) =>{
  //         console.log(response);
  //         history.push('/');
  //     })

  //     // if(validare()==true){
  //     // history.push('/')
  //     // // window.location.reload();
  //     // alert('Contul a fost schimbat! Va rugam sa va reautentificati cu noile date!')
  //     // }
  // }


  function validareusername() {
    if (username.replace(/\s/g, "").length < 3 ||
      username.replace(/\s/g, "").length > 15) {
      alert('Numele de utilizator trebuie sa aiba cel putin 3 caractere')
      return false;
    }
  }

  function validareemail() {
    if (!email.includes('@')) {
      alert('Email-ul nu este valid')
      return false;
    }

  }

  function validarepassword() {
    if (password.replace(/\s/g, "").length <= 7) {
      alert('Parola trebuie sa aiaba cel putin 8 caractere')
      return false;
    }
    if (password !== confirmPassword) {
      alert('Parolele nu coincid')
      return false;
    }

    return true
  }


  return (
    <div className='profil'>
      <h1>Buna, {LogInStatus}!</h1>
      <h2>Schimbati datele de logare:</h2>
      <div className='inputText'>
        <label for="username">Username: </label>
        <input type="text" id="username" onChange={handleChangeUsername} />
        <input type="button" value="Confirm Username" id="btnUsername" onClick={validareusername} />

        <label for="email">Email: </label>
        <input type="text" id="email" onChange={handleChangeEmail} />
        <input type="button" value="Confirm Email" id="btnEmail" onClick={validareemail} />

        <label for="password">Password: </label>
        <input type="text" id="password" onChange={handleChangePassword} />
        <label for="confirmPassword">Confirm password: </label>
        <input type="text" id="confirmPassword" onChange={handleChangeConfirmPassword} />
        <input type="button" value="Confirm Password" id="btnPass" onClick={validarepassword} />
      </div>

      <input type="button" value="Dezactivare Cont" id="btnPass" onClick={validarepassword} />
    </div>

  );
} 