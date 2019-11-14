import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import CardsPage from './components/CardsPage.js';
import AnalysisPage from './components/AnalysisPage.js';
import './App.css';

function App() {
  //const [adding, setAdding] = useState(false);
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='body'>
          <Switch>
            <Route exact path='/' component={CardsPage} />
            <Route path='/analysis' component={AnalysisPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
