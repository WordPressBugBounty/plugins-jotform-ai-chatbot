import React from 'react';

import IconNotificationText from '../assets/svg/IconNotificationText.svg';
import { ALL_TEXTS } from '../constants';
import { t } from '../utils';
import Button from './UI/Button';

const Footer = () => {
  const handleFeedbackClick = () => {
    window.open('https://link.jotform.com/V9WBvjTyR2', '_blank');
  };

  return (
    <footer className='chatbot-footer'>
      <a
        className='how-to-use-link'
        href='https://link.jotform.com/NTVCqmVoHv'
        target='_blank'
        rel='noreferrer'
      >
        {(t(ALL_TEXTS.HOW_TO_USE_JOTFORM_AI_CHATBOT))}
      </a>
      <Button
        startIcon={<IconNotificationText />}
        variant='outline'
        colorStyle='secondary'
        onClick={handleFeedbackClick}
      >
        {(t(ALL_TEXTS.GIVE_FEEDBACK))}
      </Button>
    </footer>
  );
};

export default Footer;
