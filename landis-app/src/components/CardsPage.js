import React, { useState } from 'react';
import Card from './Card.js';

function CardsPage(props) {
  return (
    <div className='CardsPage'>
      {props.users.map(user => {
        const indicator =
          ((0.8 * user.credit) / 800 + (0.2 * user.balance) / 20000) * 100;
        return (
          <Card user={user} key={user.id} indicator={Math.floor(indicator)} />
        );
      })}
    </div>
  );
}

export default CardsPage;
