import React from 'react';

import { ALL_TEXTS } from '../constants';
import GenericError from './GenericError';

const NetworkError = () => (
  <GenericError message={ALL_TEXTS.NETWORK_ERROR_DESC_ENTERPRISE} />
);

export default NetworkError;
