import React, { useState } from 'react';
import Indicator from './Indicator.js';

// name
// balance
// credit
// email
// phone
// employer
// address
// comments
// created
// tags
// id

function Card() {
  return (
    <div className='Card'>
      <div className='cardImageAndIndicator'>
        <img src='https://i.pravatar.cc/377' alt='user' />
        <Indicator />
      </div>
      <div className='userInfo'>
        <h2>Aaron Smith</h2>
        <h3 id='balance'>Balance: $1,000.00</h3>
        <h3>Credit: $500.00</h3>
        <hr />
        <p>
          <span className='userInfoLabel'>Email: </span>
          aaron.sm2019@gmail.com
        </p>
        <p>
          <span className='userInfoLabel'>Phone: </span>
          (727) 270-1123
        </p>
        <p>
          <span className='userInfoLabel'>Address: </span>
          303 Oak Ln, New Yrok, NY, 33404
        </p>
        <p>
          <span className='userInfoLabel'>Employer: </span>
          Microsoft
        </p>
        <hr />
        <p>
          <span className='userInfoLabel'>Comments: </span>
          account needs attention
        </p>
        <p>
          <span className='userInfoLabel'>Created: </span>
          10-12-2017
        </p>
        <p>
          <span className='userInfoLabel'>Tags: </span>
          n/a
        </p>
        <p>
          <span className='userInfoLabel'>ID: </span>
          3342356743
        </p>
      </div>
    </div>
  );
}

export default Card;
