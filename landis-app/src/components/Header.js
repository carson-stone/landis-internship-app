import React, { useState } from 'react';
import logo from './../landscape-fg-primary.svg';

function Header() {
  return (
    <div className='Header'>
      <img src={logo} alt='Landis logo' />
    </div>
  );
}

export default Header;
