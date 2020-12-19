import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../App.css';
import './Formular.css';
import Axios from 'axios';

import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";

import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const labels = {
  1: "Suprapopulat",
  2: "Aglomerat",
  3: "Normal",
  4: "Liber",
  5: "Gol"
};

const labelsat = {
  0.5: "Groaznic",
  1: "Oribil",
  1.5: "Prost",
  2: "Neplacut",
  2.5: "Nesatisfacator",
  3: "Normal",
  3.5: "Placut",
  4: "Satisfacator",
  4.5: "Bun",
  5: "Excelent"
};

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Suprapopulat"
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Aglomerat"
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Normal"
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Liber"
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Gol"
  }
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',

  },
});

export default function Formular() {

  // transport = ["Metrou","Tramvai","Autobuz","Troleibuz"];

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [value2, setValue2] = React.useState(2);
  const [hover2, setHover2] = React.useState(-1);
  const classes = useStyles();


  const [punct_plecare, setPunctPlecare] = useState('');
  const [punct_sosire, setPunctSosire] = useState('');
  const [mijloc_transport, setMijlocTransport] = useState('');
  const [numarul, setNumar] = useState('');
  const [ora_plecarii, setOraPlecarii] = useState('');
  const [durata_calatoriei, setDurataCalatorie] = useState('');
  const [grad_aglomerare, setGradAglomerare] = useState('');
  const [nivel_satisfactie, setNivelSatisfactie] = useState('');
  const [alte_comentarii, setAlteComentarii] = useState('');

  let history = useHistory();

  const handlePunctPlecare = (e) => {
    setPunctPlecare(e.target.value);
  }
  const handlePunctSosire = (e) => {
    setPunctSosire(e.target.value);
  }
  const handleMijlocTransport = (e) => {
    setMijlocTransport(e.target.value);
  }
  const handleNumar = (e) => {
    setNumar(e.target.value);
  }
  const handleOraPlecarii = (e) => {
    setOraPlecarii(e.target.value);
  }
  const handleDurataCalatoriei = (e) => {
    setDurataCalatorie(e.target.value);
  }
  const handleGradAglomerare = (e) => {
    setGradAglomerare(e.target.value);
  }
  const handleNivelSatisfactie = (e) => {
    setNivelSatisfactie(e.target.value);
  }
  const handleAlteComentarii = (e) => {
    setAlteComentarii(e.target.value);
  }

  const fctFrm = () => {
    Axios.post('http://localhost:3001/formular',
      {
        punct_plecare: punct_plecare, punct_sosire: punct_sosire, mijloc_transport: mijloc_transport,
        numarul: numarul, ora_plecarii: ora_plecarii, durata_calatoriei, grad_aglomerare: grad_aglomerare,
        nivel_satisfactie: nivel_satisfactie, alte_comentarii: alte_comentarii, 
      }).then((response) => {
        console.log(response);
        history.push('/');
      })

    if (validare() == true) {
      history.push('/')
      alert('Recenzia a fost inregistrata!')
    }
  }

  function validare() {
    return true
  }

  return (
    <div className='formular'>
      <h1>Formular</h1>
      <div className='inputText'>
        <label>Punct plecare:</label>
        <input type='text' name='punct_plecare' onChange={handlePunctPlecare} />
        <label>Punct sosire:</label>
        <input type='text' name='punct_sosire' onChange={handlePunctSosire} />
        <label>Mijloc de transport:</label>
        <input type='text' name='mijloc_transport' onChange={handleMijlocTransport} />
        <label>Numarul:</label>
        <input type='text' name='numarul' onChange={handleNumar} />
        <label>Ora plecarii:</label>
        <input type='text' name='ora_plecarii' onChange={handleOraPlecarii} />
        <label>Durata calatoriei:</label>
        <input type='text' name='durata_calatoriei' onChange={handleDurataCalatoriei} />


        <label>Grad aglomerare:</label>
        <div className={classes.root}>
          <Rating
            name="grad_aglomerare"
            defaultValue={2}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setGradAglomerare(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
          />
          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>




        <label>Nivel satisfactie:</label>
        <div className={classes.root}>
          <Rating
            name="nivel_satisfactie"
            value={value2}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue2(newValue);
              setNivelSatisfactie(newValue);

            }}
            onChangeActive={(event, newHover) => {
              setHover2(newHover);
            }}
          />
          {value2 !== null && (
            <Box ml={2}>{labelsat[hover2 !== -1 ? hover2 : value2]}</Box>
          )}
        </div>


        <label>Alte comentarii:</label>
        <input type='text' name='alte_comentarii' onChange={handleAlteComentarii} />

        <input type="button" value="Submit" id="btnSubmit" onClick={validare, fctFrm} />
      </div>
    </div>

  );
}