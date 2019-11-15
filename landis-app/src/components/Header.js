import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../landscape-fg-primary.svg';

function Header() {
  return (
    <div className='Header'>
      <img src={logo} alt='Landis logo' />
      <nav>
        <NavLink exact to='/' activeClassName='activeLink' className='link'>
          Card Layout
        </NavLink>
        <NavLink to='/analysis' activeClassName='activeLink' className='link'>
          Analysis
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
