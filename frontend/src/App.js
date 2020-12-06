import React from 'react'
import Navbar from './components-ai/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components-ai/pages/Home';
import Autentificare from './components-ai/pages/Autentificare';
import Inregistrare from './components-ai/pages/Inregistrare';
import Formular from './components-ai/pages/Formular';
import Recenzii from './components-ai/pages/Recenzii';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/autentificare' component={Autentificare} />
          <Route path='/inregistrare' component={Inregistrare} />
          <Route path='/formular' component={Formular} />
          <Route path='/recenzii' component={Recenzii} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
