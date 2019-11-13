import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import CardsPage from './components/CardsPage.js';
import AnalysisPage from './components/AnalysisPage.js';
import './App.css';

function App() {
  //const [adding, setAdding] = useState(false);
  return (
    <div className='App'>
      <Header />
      <div className='body'></div>
      <Footer />
    </div>
  );
}

export default App;
