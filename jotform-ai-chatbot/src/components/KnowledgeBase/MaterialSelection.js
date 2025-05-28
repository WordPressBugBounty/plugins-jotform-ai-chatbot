/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { func, string } from 'prop-types';

import { TRAIN_TYPES } from '../../constants';

const MaterialSelection = ({
  materialType,
  setMaterialType = f => f,
  setStep = f => f
}) => {
  const handleClick = key => {
    setMaterialType(key);
    setStep('editor');
  };

  return (
    <ul>
      {/* knowledge */}
      {Object.entries(TRAIN_TYPES).map(([key, item]) => (
        <li
          key={key}
          data-is-selected={materialType === key}
          data-background={`${item.color}`}
          onClick={() => handleClick(key)}
        >
          {/* for icon */}
          <span>{item.icon}</span>
          <span>{item.color}</span>
          {/* text */}
          <div>
            <h3>{item.name.toUpperCase()}</h3>
            <p>{item.desc}</p>
          </div>
          {/* icon right */}
          <span>icon right</span>
        </li>
      ))}
    </ul>
  );
};

export default MaterialSelection;

MaterialSelection.propTypes = {
  materialType: string,
  setMaterialType: func,
  setStep: func
};
