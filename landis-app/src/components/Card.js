import React, { useState } from 'react';
import Indicator from './Indicator.js';

function Card(props) {
  const { user, indicator } = props;
  const {
    id,
    picture,
    name_first,
    name_last,
    balance,
    credit,
    email,
    phone,
    employer,
    address,
    comments,
    created,
    tags
  } = user;

  return (
    <div className='Card'>
      <div className='cardImageAndIndicator'>
        <img src={picture} alt='user' />
        <Indicator score={indicator} />
      </div>
      <div className='userInfo'>
        <h2>
          {name_first} {name_last}
        </h2>
        <h3 id='balance'>Balance: ${balance}</h3>
        <h3>Credit: {credit}</h3>
        <hr />
        <p>
          <span className='userInfoLabel'>Email: </span>
          {email}
        </p>
        <p>
          <span className='userInfoLabel'>Phone: </span>
          {phone}
        </p>
        <p>
          <span className='userInfoLabel'>Address: </span>
          {address}
        </p>
        <p>
          <span className='userInfoLabel'>Employer: </span>
          {employer}
        </p>
        <hr />
        <p>
          <span className='userInfoLabel'>Comments: </span>
          {comments}
        </p>
        <p>
          <span className='userInfoLabel'>Created: </span>
          {created.substring(0, 21)}
        </p>
        <p>
          <span className='userInfoLabel'>Tags: </span>
          {tags.map(tag => (
            <span key={tag}>{tag} </span>
          ))}
        </p>
        <p>
          <span className='userInfoLabel'>ID: </span>
          {id}
        </p>
      </div>
    </div>
  );
}

export default Card;
