import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import CardsPage from './components/CardsPage.js';
import AnalysisPage from './components/AnalysisPage.js';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const getCards = async () => {
    try {
      const res = await fetch('/api/cards');
      const body = await res.json();
      return body;
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const users = await getCards();
      setUsers(users);
    };
    getData();
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='body'>
          <Switch>
            <Route exact path='/' render={() => <CardsPage users={users} />} />
            <Route path='/analysis' component={AnalysisPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
