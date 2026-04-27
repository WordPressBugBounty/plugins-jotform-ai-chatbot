import React from 'react';

import { ALL_TEXTS } from '../../../constants';

const InvalidCredentialsError = errorCode => (
  <p className='jfpContent-wrapper--settings-options-input-error'>{ALL_TEXTS[errorCode] || ALL_TEXTS.WOO_INVALID_CREDENTIALS}</p>
);

export default InvalidCredentialsError;
