import React from 'react';

function Indicator(props) {
  return (
    <div
      className='Indicator'
      style={{
        color: `rgba(${255 - 2 * props.score}, ${2 * props.score}, 50, 0.8)`
      }}
    >
      <p>{props.score}%</p>
    </div>
  );
}

export default Indicator;
