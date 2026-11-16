import React, { useState } from 'react';
import { func, number } from 'prop-types';

import '../styles/connectionRecovery.scss';

import { ALL_TEXTS } from '../constants';
import Button from './UI/Button';
import { IconExclamationTriangle } from './UI/Icon';

const ConnectionRecovery = ({ error, onRetry, onDisconnect }) => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [disconnectFailed, setDisconnectFailed] = useState(false);
  const canReplace = [403, 404, 409].includes(error);
  let message = ALL_TEXTS.CONNECTED_AGENT_LOAD_ERROR;
  if ([401, 403].includes(error)) {
    message = ALL_TEXTS.CONNECTED_AGENT_ACCESS_ERROR;
  } else if ([404, 409].includes(error)) {
    message = ALL_TEXTS.CONNECTED_AGENT_UNAVAILABLE;
  }

  const disconnect = async () => {
    setIsDisconnecting(true);
    setDisconnectFailed(false);
    try {
      await onDisconnect();
    } catch {
      setDisconnectFailed(true);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <section className='connection-recovery' aria-labelledby='connection-recovery-title' aria-busy={isDisconnecting}>
      <div className='connection-recovery__icon' aria-hidden='true'><IconExclamationTriangle /></div>
      <div role='alert'>
        <h2 id='connection-recovery-title'>{canReplace ? ALL_TEXTS.CONNECTED_AGENT_UNAVAILABLE_TITLE : ALL_TEXTS.NETWORK_ERROR_TITLE}</h2>
        <p>{message}</p>
      </div>
      {canReplace && <p className='connection-recovery__help'>{ALL_TEXTS.REPLACE_CHATBOT_DESCRIPTION}</p>}
      {disconnectFailed && <p className='connection-recovery__error' role='alert'>{ALL_TEXTS.DISCONNECT_CHATBOT_ERROR}</p>}
      <div className='connection-recovery__actions'>
        {canReplace && <Button onClick={disconnect} loader={isDisconnecting}>{ALL_TEXTS.SET_UP_ANOTHER_CHATBOT}</Button>}
        <Button onClick={onRetry} variant={canReplace ? 'outline' : 'default'} colorStyle={canReplace ? 'secondary' : 'primary'} disabled={isDisconnecting}>
          {ALL_TEXTS.RETRY_CONNECTION}
        </Button>
      </div>
      <a className='connection-recovery__settings' href='admin.php?page=jotform_ai_chatbot_settings'>{ALL_TEXTS.MANAGE_CONNECTED_ACCOUNT}</a>
    </section>
  );
};

ConnectionRecovery.propTypes = { error: number.isRequired, onRetry: func.isRequired, onDisconnect: func.isRequired };

export default ConnectionRecovery;
