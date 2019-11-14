import React, { useState } from 'react';
import Card from './Card.js';
import Indicator from './Indicator.js';

function CardsPage() {
  return (
    <div className='CardsPage'>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardsPage;
