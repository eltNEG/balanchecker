import React, { useState } from 'react';
import './Tab.scss';

export default ({ handleClick }) => {
  const [state, setState] = useState('Ethereum');

  const handleOnClick = e => {
    const { name } = e.target;
    setState(name);
    if (handleClick) {
      handleClick(name);
    }
  };
  return (
    <div>
      <TabButton
        name="Ethereum"
        handleOnClick={handleOnClick}
        currName={state}
      />
      <TabButton
        name="Token"
        right
        handleOnClick={handleOnClick}
        currName={state}
      />
    </div>
  );
};

const TabButton = ({ handleOnClick, name, currName, right }) => {
  return (
    <button
      onClick={handleOnClick}
      name={name}
      className={`tab ${right ? 'tab__right' : 'tab__left'} ${
        currName === name ? 'tab__active' : 'tab__not-active'
      }`}
    >
      {name}
    </button>
  );
};
