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
      Axios.get("http://localhost:3001/autentificare").then((response) =>{
        if(response.data.loggedIn==true) {
          return false;
        }
        return true;
      })

      }

    
    const fctAut = () => {
        Axios.post('http://localhost:3001/autentificare', 
        {username: username, password: password}).then((response) =>{
            
          if(response.data.message) {
            setLoginStatus(response.data.message)
            alert('Username-ul sau parola este gresita')
          } else {
            setLoginStatus(response.data[0].username)
            window.location.reload();
          }


          console.log(response);
        })

    }

    useEffect(() => {
      Axios.get("http://localhost:3001/autentificare").then((response) =>{
      if(response.data.loggedIn==true) {
        setLoginStatus(response.data.user[0].username)
        history.push('/')
        window.location.reload();
      } 
      })
    }, [])


    return (
        <div className='autentificare'>
            <h1 name={'Inregistrare'} />

            <h1>Autentificati-va:</h1>
            <div className='inputText'>
                <label for="username">Username: </label>
                <input type="text" id="username" onChange={handleChangeUsername} />
                <label for="password">Password: </label>
                <input type="text" id="password" onChange={handleChangePassword} />
            </div>

            <input type="button" value="Log in" id="btnSignUp" onClick={fctAut} />
        </div>
    );
}

export default Autentificare;