import React from 'react';
import { node } from 'prop-types';

import { ALL_TEXTS } from '../constants';
import { t } from '../utils';

const OnboardingModal = ({ children }) => (
  <div
    open
    onClose={f => f}
    ariaLabel={t(ALL_TEXTS.CHATBOT_ONBOARDING)}
    className='chatbot-onboarding-modal'
  >
    <div>
      {children}
    </div>
  </div>
);

OnboardingModal.propTypes = {
  children: node.isRequired
};

export default OnboardingModal;
