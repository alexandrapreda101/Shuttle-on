import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import './Autentificare.css';

function Autentificare() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [LogInStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  let history = useHistory();

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const validare = () => {
    Axios.get("http://localhost:3001/autentificare", { withCredentials: true }).then((response) => {
      if (response.data.loggedIn == true) {
        return false;
      }
      return true;
    })

  }


  const fctAut = () => {
    Axios.post('http://localhost:3001/autentificare',
      { username: username, password: password, withCredentials: true }).then((response) => {

        if (response.data.message) {
          setLoginStatus(response.data.message)
          alert('Username-ul sau parola este gresita')
        } else {
          setLoginStatus(response.data.username)
          window.location.reload();
        }
        console.log(response);
      })

  }

  useEffect(() => {
    Axios.get("http://localhost:3001/autentificare").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.username)
        history.push('/')
        window.location.reload();
      }
    })
  }, [])


  return (
    <div className='autentificare'>

      <form>
        <div class="con">
          <header class="head-form">
            <h2>Autentificare</h2>
            <p>Autentificati-va aici cu Username-ul si Parola</p>
          </header>
        </div>

        <div class="field-set">

          <input class="form-input" id="username" type="text" placeholder="Username" onChange={handleChangeUsername}></input>
          <input class="form-input" type="password" placeholder="Parola" id="password" name="password" onChange={handleChangePassword} />
        
        </div>

        {/* <button class="log-in" id="btnSignUp" onClick={fctAut}> Autentificare </button> */}
        <input type="buttonaut" value="Autentificare" id="btnSignUp" onClick={fctAut} />
      </form>


    </div>
  );
}

export default Autentificare;