import React, { useState } from 'react';
import Card from './Card.js';

function CardsPage(props) {
  return (
    <div className='CardsPage'>
      {props.users.map(user => {
        const indicator =
          ((0.7 * user.credit) / 850 + (0.3 * user.balance) / 15000) * 100;
        return (
          <Card user={user} key={user.id} indicator={Math.floor(indicator)} />
        );
      })}
    </div>
  );
}

export default CardsPage;
