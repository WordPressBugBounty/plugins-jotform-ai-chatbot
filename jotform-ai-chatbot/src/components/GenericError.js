import React from 'react';
import { string } from 'prop-types';

import { t } from '../utils';
import { IconExclamationTriangle } from './UI/Icon';

// todo: ui - move inline styles to stylesheet
const GenericError = ({ message }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      backgroundColor: 'var(--jfv-red-100)',
      borderRadius: '4px',
      padding: '12px 16px',
      maxWidth: '526px',
      marginTop: '100px'
    }}
  >
    <div style={{ flexShrink: 0, marginTop: '2px' }}>
      <IconExclamationTriangle style={{ width: '13px', height: '13px', fill: 'var(--jfv-red-400)' }} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{
        margin: 0,
        color: 'var(--jfv-red-400)',
        fontSize: '12px',
        lineHeight: '16px'
      }}
      >{t(message)}
      </p>
    </div>
  </div>
);

GenericError.propTypes = {
  message: string.isRequired
};

export default GenericError;
