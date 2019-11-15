import React, { useState } from 'react';
import Card from './Card.js';

function CardsPage(props) {
  return (
    <div className='CardsPage'>
      {props.users.map(user => (
        <Card user={user} />
      ))}
    </div>
  );
}

export default CardsPage;
