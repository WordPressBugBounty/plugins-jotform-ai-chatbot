import React from 'react';
import { string } from 'prop-types';

import { IconExclamationTriangle } from './UI/Icon';

const GenericError = ({ message }) => (
  <div className='generic-error'>
    <div className='generic-error--icon'>
      <IconExclamationTriangle />
    </div>
    <div className='generic-error--content'>
      <p>{message}</p>
    </div>
  </div>
);

GenericError.propTypes = {
  message: string.isRequired
};

export default GenericError;
