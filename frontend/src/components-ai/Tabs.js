import { Link } from 'react-router-dom'
import '../App.css'
import { Button } from './Button'
import './Tabs.css'

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import DirectionsSubwayIcon from '@material-ui/icons/DirectionsSubway';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import TramIcon from '@material-ui/icons/Tram';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import CommuteIcon from '@material-ui/icons/Commute';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import TrainIcon from '@material-ui/icons/Train';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Metrou" icon={<DirectionsRailwayIcon />} {...a11yProps(0)} />
                    <Tab label="Autobuz" icon={<DirectionsBusIcon />} {...a11yProps(1)} />
                    <Tab label="Tramvai" icon={<TramIcon />} {...a11yProps(2)} />

                    <Tab label="Troleibuz" icon={<TrainIcon />} {...a11yProps(3)} />

                    <Tab label="Expres" icon={<CommuteIcon />} {...a11yProps(4)} />
                    <Tab label="Regio" icon={<DirectionsSubwayIcon />} {...a11yProps(5)} />    
                    <Tab label="Noapte" icon={<NightsStayIcon />} {...a11yProps(6)} />
                </Tabs>
            </AppBar>


            <div className={'tabpanel'}>
                <TabPanel value={value} index={0} >
                <span> M1 </span>
                <span> M2 </span>
                <span> M3 </span>
                <span> M4 </span>
                <span> M5 </span>
                <span> M6 </span>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <span> 101 </span>
                    <span> 102 </span>
                    <span> 103 </span>
                    <span> 104 </span>
                    <span> 105 </span>
                    <span> 106 </span> 
                    <span> 112 </span>
                    <span> 116 </span>
                    <span> 117 </span>  
                    <span> 122 </span>  
                    <span> 123 </span> 
                    <span> 125 </span> 
                    <span> 126 </span> 
                    <span> 131 </span> 
                    <span> 133 </span> 
                    <span> 135 </span>  
                    <span> 136 </span>  
                    <span> 137 </span> 
                    <span> 138 </span> 
                    <span> 139 </span>  
                    <span> 141 </span> 
                    <span> 143 </span> 
                    <span> 162 </span>  
                    <span> 163 </span>  
                    <span> 168 </span> 
                    <span> 173 </span> 
                    <span> 178 </span> 
                    <span> 182 </span>  
                    <span> 185 </span> 
                    <span> 196 </span> 
                    <span> 202 </span> 
                    <span> 204 </span> 
                    <span> 205 </span> 
                    <span> 216 </span> 
                    <span> 220 </span> 
                    <span> 221 </span> 
                    <span> 222 </span>  
                    <span> 223 </span> 
                    <span> 226 </span> 
                    <span> 227 </span>  
                    <span> 231 </span>  
                    <span> 232 </span>  
                    <span> 236 </span>
                    <span> 241 </span>  
                    <span> 243 </span> 
                    <span> 246 </span> 
                    <span> 253 </span>  
                    <span> 261 </span>
                    <span> 268 </span> 
                    <span> 278 </span>  
                    <span> 282 </span> 
                    <span> 300 </span>  
                    <span> 301 </span>  
                    <span> 302 </span>  
                    <span> 303 </span>  
                    <span> 304 </span>  
                    <span> 311 </span> 
                    <span> 312 </span> 
                    <span> 313 </span>  
                    <span> 323 </span> 
                    <span> 330 </span>  
                    <span> 331 </span>  
                    <span> 335 </span> 
                    <span> 336 </span>  
                    <span> 343 </span>  
                    <span> 361 </span>  
                    <span> 368 </span>  
                    <span> 381 </span>  
                    <span> 385 </span>  
                    <span> 601 </span>  
                    <span> 605 </span>  
                    <span> 667 </span>  
                    <span> 668 </span>  
                    <span> 682 </span>  
                    <span> 331Bis </span>  
      </TabPanel>
                <TabPanel value={value} index={2}>
                    <span> 1 </span>
                    <span> 3 </span>
                    <span> 7 </span>
                    <span> 8 </span>
                    <span> 10 </span>
                    <span> 11 </span>
                    <span> 14 </span>
                    <span> 16 </span>
                    <span> 19 </span>
                    <span> 21 </span>
                    <span> 23 </span>
                    <span> 24 </span>
                    <span> 25 </span>
                    <span> 27 </span>
                    <span> 32 </span>
                    <span> 35 </span>
                    <span> 36 </span>
                    <span> 40 </span>
                    <span> 41 </span>
                    <span> 44 </span>
                    <span> 45 </span>
                    <span> 46 </span>
                    <span> 47 </span>
                    <span> 55 </span>
      </TabPanel>
                <TabPanel value={value} index={3}>
                    <span> 61 </span>
                    <span> 62 </span>
                    <span> 65 </span>
                    <span> 66 </span>
                    <span> 69 </span>
                    <span> 70 </span>
                    <span> 73 </span>
                    <span> 74 </span>
                    <span> 76 </span>
                    <span> 79 </span>
                    <span> 85 </span>
                    <span> 86 </span>
                    <span> 90 </span>
                    <span> 91 </span>
                    <span> 93 </span>
                    <span> 96 </span>
                    <span> 97 </span>
      </TabPanel>
                <TabPanel value={value} index={4}>
                    <span> 780 </span>
                    <span> 781 </span>
                    <span> 783 </span>
                    <span> 784 </span>
      </TabPanel>
                <TabPanel value={value} index={5}>
                    <span> R402 </span>
                    <span> R405 </span>
                    <span> R406 </span>
                    <span> R408 </span>
                    <span> R409 </span>
                    <span> R418 </span>
                    <span> R419 </span>
                    <span> R420 </span>
                    <span> R421 </span>
                    <span> R422 </span>
                    <span> R423 </span>
                    <span> R424 </span>
                    <span> R425 </span> 
                    <span> R426 </span>
                    <span> R427 </span>
                    <span> R428 </span>
                    <span> R431 </span>
                    <span> R432 </span>
                    <span> R433 </span>
                    <span> R434 </span>
                    <span> R436 </span>
                    <span> R438 </span>
                    <span> R439 </span>
                    <span> R441 </span>
                    <span> R442 </span>
                    <span> R443 </span>
                    <span> R444 </span>
                    <span> R446 </span>
                    <span> R447 </span>
                    <span> R448 </span>
                    <span> R452 </span> 
                    <span> R454 </span>
                    <span> R455 </span>
                    <span> R457 </span>
                    <span> R458 </span>
                    <span> R462 </span> 
                    <span> R464 </span>  
                    <span> R465 </span>  
                    <span> R466 </span> 
                    <span> R472 </span> 
                    <span> R474 </span>  
                    <span> R475 </span> 
                    <span> R477 </span> 
                    <span> R447Bis </span> 
      </TabPanel>
                <TabPanel value={value} index={6}>
                    <span> N101 </span>
                    <span> N102 </span>
                    <span> N103 </span>
                    <span> N104 </span>
                    <span> N105 </span>
                    <span> N106 </span>
                    <span> N107 </span>
                    <span> N108 </span>
                    <span> N109 </span>
                    <span> N110 </span>
                    <span> N111 </span>
                    <span> N112 </span>
                    <span> N113 </span>
                    <span> N114 </span>  
                    <span> N115 </span>  
                    <span> N116 </span>  
                    <span> N117 </span>  
                    <span> N118 </span>  
                    <span> N119 </span>  
                    <span> N120 </span>  
                    <span> N121 </span>  
                    <span> N122 </span>  
                    <span> N123 </span>  
                    <span> N124 </span>  
                    <span> N125 </span>   
      </TabPanel>
            </div>
        </div>
    );
}
