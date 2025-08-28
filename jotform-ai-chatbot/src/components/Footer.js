import React from 'react';
import { string } from 'prop-types';

import { saveInstallment } from '../api';
import IconNotificationText from '../assets/svg/IconNotificationText.svg';
import { ALL_TEXTS } from '../constants';
import { t } from '../utils';
import Button from './UI/Button';

const Footer = ({ platformDomain, platformPluginVersion }) => {
  const domainQuery = `?domainField=${platformDomain}&versionField=${platformPluginVersion}`;

  const handleHowToUseClick = e => {
    e.preventDefault();
    saveInstallment('howToUseJotformAiChatbotButton');
    window.open(e.target.href, '_blank');
  };

  const handleFeedbackClick = () => {
    saveInstallment('giveFeedbackButton');
    const feedbackUrl = `https://link.jotform.com/V9WBvjTyR2${domainQuery}`;
    window.open(feedbackUrl, '_blank');
  };

  return (
    <footer className='chatbot-footer'>
      <a
        className='how-to-use-link'
        href='https://link.jotform.com/NTVCqmVoHv'
        target='_blank'
        rel='noreferrer'
        onClick={handleHowToUseClick}
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

Footer.propTypes = {
  platformDomain: string.isRequired,
  platformPluginVersion: string.isRequired
};

export default Footer;
