import React from 'react';

import IconNotificationText from '../assets/svg/IconNotificationText.svg';
import { ALL_TEXTS } from '../constants';
import { t } from '../utils';
import Button from './UI/Button';

const Footer = () => {
  const handleFeedbackClick = () => {
    window.open('https://form.jotform.com/250084125210946', '_blank');
  };

  return (
    <footer className='chatbot-footer'>
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
