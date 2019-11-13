import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
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
