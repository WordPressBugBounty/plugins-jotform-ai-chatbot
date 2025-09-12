import React from 'react';

import { ALL_TEXTS } from '../constants';
import { t } from '../utils';

// todo: update design/ui
const NetworkError = () => (
  <div style={{
    marginTop: '48px',
    padding: '14px 18px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    backgroundColor: '#FDFDFD',
    fontSize: '14px',
    color: '#333',
    textAlign: 'center',
    lineHeight: '1.5',
    maxWidth: '420px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      marginBottom: '6px',
      gap: '6px'
    }}
    >
      <span style={{ fontSize: '16px' }}>⚠️</span>
      {t(ALL_TEXTS.NETWORK_ERROR_TITLE)}
    </div>
    <div>
      {t(ALL_TEXTS.NETWORK_ERROR_DESC_ENTERPRISE)}
    </div>
    <div style={{
      fontSize: '12px',
      color: '#666',
      marginTop: '6px'
    }}
    >
      {t(ALL_TEXTS.NETWORK_ERROR_DESC_NETWORK)}
    </div>
  </div>
);

export default NetworkError;
