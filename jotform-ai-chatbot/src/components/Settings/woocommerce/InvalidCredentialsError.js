import React from 'react';
import { string } from 'prop-types';

import { ALL_TEXTS } from '../../../constants';

const InvalidCredentialsError = ({ errorCode = '' }) => (
  <p className='jfpContent-wrapper--settings-options-input-error'>{ALL_TEXTS[errorCode] || ALL_TEXTS.WOO_INVALID_CREDENTIALS}</p>
);

export default InvalidCredentialsError;

InvalidCredentialsError.propTypes = {
  errorCode: string
};
