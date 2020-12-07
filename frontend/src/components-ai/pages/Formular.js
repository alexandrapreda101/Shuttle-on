import React from 'react';
import '../../App.css';
import './Formular.css';


export default function Formular() {

  // transport = ["Metrou","Tramvai","Autobuz","Troleibuz"];

  return (
    <div className='formular'>
      <h1>Formular</h1>
      <div className='inputText'>
        <label>Punct plecare:</label>
        <input type='text' name='punct_plecare' />
        <label>Punct sosire:</label>
        <input type='text' name='punct_sosire' />
        <label>Mijloc de transport:</label>
        <input type='text' name='mijloc_transport' />
        <label>Numarul:</label>
        <input type='text' name='numarul' />
        <label>Ora plecarii:</label>
        <input type='text' name='ora_plecarii' />
        <label>Durata calatoriei:</label>
        <input type='text' name='durata_calatoriei' />
        <label>Grad aglomerare:</label>
        <input type='text' name='grad_aglomerare' />
        <label>Nivel satisfactie:</label>
        <input type='text' name='nivel_satisfactie' />
        <label>Alte comentarii:</label>
        <input type='text' name='alte_comentarii' />

        <button>Submit</button>
      </div>
    </div>

  );
}