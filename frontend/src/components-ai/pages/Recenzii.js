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

  const [comentariu, setComentariu] = useState('');

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

  const handleChangeComentariu = (e) => {
    setComentariu(e.target.value);
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

  ////////////

  const updatecomentariu = () => {
    Axios.put(`http://localhost:3001/inregistrare/username/${IdStatus}`,
      { comentariu: comentariu }).then((response) => {
        console.log(response);
      })
    alert('S-a editat comentariul')
    logOut()
  }


  ///////////////


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

      <form>
        <div class="con">
          <header class="head-form">
            <h2>Buna, {LogInStatus}!</h2>
            <p>Va rugam completati formularul pentru a va actualiza datele</p>
          </header>
        </div>

        <div class="field-set">

          <input class="form-input" type="text" placeholder="Username" id="username" onChange={handleChangeUsername} />
          <input class="button-form" type="button" value="Change Username" onClick={validareusername, updateuser} />

          <input class="form-input" id="email" type="text" placeholder="Email" onChange={handleChangeEmail}></input>
          <input class="button-form" type="button" value="Change Email" onClick={validareemail, updateemail} />

          <input class="form-input" id="password" type="text" placeholder="Password" onChange={handleChangePassword}></input>
          <input class="button-form" type="button" value="Confirm Password" onClick={validarepassword, updatepassword} />

        </div>

        <button class="btnDezactivare" id="btnPass" onClick={deleteuser}> Dezactivare Cont </button>
      </form>

      <div class="userecenzi">

        <h2 class="recenzieTitlu">Recenzii</h2>
        {listaRecenzii.map((val) => {
          return (

            <div className="recenzie">
              <span ><strong>Punct plecare :</strong></span> {val.punct_plecare}<span className="spans"><strong> Punct sosire : </strong></span>{val.punct_sosire}
              <span className="spans"><strong>  Mijloc transport: </strong></span>{val.mijloc_transport}<span className="spans"><strong> Numarul: </strong></span>{val.numarul}
              <span ><strong> <br></br> Grad Aglomerare: </strong></span> {val.grad_aglomerare}<span className="otherspans"><strong> Durata calatoriei: </strong></span>{val.durata_calatoriei}
              <span className="otherspans"><strong>  Ora plecarii:</strong></span> {val.ora_plecarii}<span className="otherspans"><strong> Nivel satisfactie:</strong></span> {val.nivel_satisfactie}
              <br></br><span ><strong> Alte comentarii:</strong></span>  {val.alte_comentarii}

            </div>

          )

        })}
      </div>

    </div>

  );
}