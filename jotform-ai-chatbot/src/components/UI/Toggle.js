import React from 'react';
import { bool, func } from 'prop-types';

import '../../styles/toggle.scss';

const Toggle = ({ checked, onChange }) => (
  <label className='chatbot-toggle'>
    <input
      className='chatbot-toggle--input'
      type='checkbox'
      checked={checked}
      onChange={onChange}
    />
    <span className='chatbot-toggle--slider' />
  </label>
);

Toggle.propTypes = {
  checked: bool.isRequired,
  onChange: func.isRequired
};

export default Toggle;
