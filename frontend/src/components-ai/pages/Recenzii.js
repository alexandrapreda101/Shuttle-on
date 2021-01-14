import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../App.css';
import './Profil.css';
import Axios from 'axios';


export default function Profil() {

  const [LogInStatus, setLoginStatus] = useState('');
  const [IdStatus, setIdStatus] = useState(0);
  const [listaRecenzii, setListaRecenzii] = useState([]);

  Axios.defaults.withCredentials = true;

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/autentificare").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.username);
        setIdStatus(parseInt(response.data.user.id));
      }
    })
  }, [])


  useEffect(() => {
    Axios.get(`http://localhost:3001/formular/findIds/${parseInt(IdStatus)}`).then((response) => {
      setListaRecenzii(response.data);
    })
  }, [IdStatus])

  const logOut = () => {

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });


    history.push('/')
    window.location.reload();

  }

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const deleteuser = () => {
    Axios.delete(`http://localhost:3001/inregistrare/${IdStatus}`);
    history.push('/')
    alert('Contul a fost sters!')
    logOut()
  }

  const updateuser = () => {
    if (validareusername() == true) {
      Axios.put(`http://localhost:3001/inregistrare/username/${IdStatus}`,
        { username: username }).then((response) => {
          console.log(response);
        })
      alert('Logati-va cu noile date!')
      logOut()
    }
  }

  const updateemail = () => {

    if (validareemail() == true) {
      Axios.put(`http://localhost:3001/inregistrare/username/${IdStatus}`,
        { email: email }).then((response) => {
          console.log(response);
          history.push('/');
        })
      alert('Logati-va cu noile date!')
      logOut()
    }
  }

  const updatepassword = () => {
    if (validarepassword() == true) {
      Axios.put(`http://localhost:3001/inregistrare/username/${IdStatus}`,
        { password: password }).then((response) => {
          console.log(response);
          history.push('/');
        })
      alert('Logati-va cu noile date!')
      logOut()
    }
  }


  function validareusername() {
    if (username.replace(/\s/g, "").length < 3 ||
      username.replace(/\s/g, "").length > 15) {
      alert('Numele de utilizator trebuie sa aiba cel putin 3 caractere')
      return false;
    }

    return true
  }

  function validareemail() {
    if (!email.includes('@')) {
      alert('Email-ul nu este valid')
      return false;
    }

    return true
  }

  function validarepassword() {
    if (password.replace(/\s/g, "").length <= 7) {
      alert('Parola trebuie sa aiaba cel putin 8 caractere')
      return false;
    }

    return true
  }


  return (
    <div className='profil'>
      <h1>Buna,{LogInStatus}!</h1>
      <h2>Schimbati datele de logare:</h2>
      <div className='inputText'>
        <label for="username">Username: </label>
        <input type="text" id="username" onChange={handleChangeUsername} />
        <input type="button" value="Confirm Username" id="btnUsername" onClick={validareusername, updateuser} />

        <label for="email">Email: </label>
        <input type="text" id="email" onChange={handleChangeEmail} />
        <input type="button" value="Confirm Email" id="btnEmail" onClick={validareemail, updateemail} />

        <label for="password">Password: </label>
        <input type="text" id="password" onChange={handleChangePassword} />
        <input type="button" value="Confirm Password" id="btnPass" onClick={validarepassword, updatepassword} />
        {/* <input type="button" value="Vezi Review-uri" id="btnRev" onClick={seeReviews} /> */}
      </div>


      <input type="button" value="Dezactivare Cont" id="btnPass" onClick={deleteuser} />

      <h2 class="recenzieTitlu">Recenzii</h2>
      {listaRecenzii.map((val) => {
        return (
          <div className="recenzie">
            Punct plecare : {val.punct_plecare} | Punct sosire : {val.punct_sosire}
                     |  Mijloc transport: {val.mijloc_transport}| Numarul: {val.numarul}
                     |  Ora plecarii: {val.ora_plecarii}| Durata calatoriei: {val.durata_calatoriei}
                     |  Grad aglomerare: {val.grad_aglomerare}| Nivel satisfactie: {val.nivel_satisfactie}
                     |  Alte comentarii:  {val.alte_comentarii} </div>
        )
      })}
    </div>


  );
}