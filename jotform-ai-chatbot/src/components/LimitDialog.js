import React from 'react';
import { func, string } from 'prop-types';

import IconInfoSquareFilled from '../assets/svg/IconInfoSquareFilled.svg';
import { ALL_TEXTS } from '../constants';
// import { t } from '../utils';
import Button from './UI/Button';
import Modal from './UI/Modal';

const t = f => f;

const LimitDialog = ({
  utmContent = 'ai-chatbot-chat-generator',
  onCloseClick
}) => (
  <Modal
    open
    onClose={onCloseClick}
    ariaLabel={t(ALL_TEXTS.YOU_HAVE_REACHED_YOUR_LIMIT)}
    size='small'
  >
    <div className='jfModal--title'>
      <div className='jfModal--title-icon jfModal--title-icon-error'>
        <IconInfoSquareFilled />
      </div>
      <h3>
        {t(ALL_TEXTS.YOU_HAVE_REACHED_YOUR_LIMIT)}
      </h3>
      <p>
        {t(ALL_TEXTS.DELETE_EXISTING_AGENT)}
      </p>
    </div>
    <div className='jfModal--actions'>
      <Button
        target='_blank'
        href={`https://www.jotform.com/ai-agents/pricing/?utm_source=limitDialog&utm_content=${utmContent}&utm_campaign=aiAgents-ADMIN&utm_medium=banner&utm_term=upgrade-now-text`}
        colorStyle='error'
      >
        {t(ALL_TEXTS.GO_TO_PRICING)}
      </Button>
    </div>
  </Modal>
);

LimitDialog.propTypes = {
  utmContent: string,
  onCloseClick: func.isRequired
};

export default LimitDialog;
