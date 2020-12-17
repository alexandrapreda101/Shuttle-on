import React from 'react';
import '../../App.css';
import './Formular.css';

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
        <div className={classes.root}>
        <Rating
          name="grad_aglomerare"
          defaultValue={2}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
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
        name="hover-feedback"
        value={value2}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue2(newValue);
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
        <input type='text' name='alte_comentarii' />

        <button>Submit</button>
      </div>
    </div>

  );
}