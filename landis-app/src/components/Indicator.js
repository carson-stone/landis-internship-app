import React, { useState } from 'react';

function Indicator(props) {
  return (
    <div className='Indicator'>
      <p>{props.score}%</p>
    </div>
  );
}

export default Indicator;
