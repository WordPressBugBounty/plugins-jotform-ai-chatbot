import React from 'react';

import { ALL_TEXTS } from '../../constants';
import { IconAIColor } from '../UI/Icon';

const AutoTrainInfoBox = () => (
  <div className='trained-knowledge'>
    <div className='trained-knowledge-content'>
      <div className='trained-knowledge-content-icon'>
        <IconAIColor />
      </div>
      <h3 className='trained-knowledge-content-title'>{ALL_TEXTS.AUTO_TRAINED_KNOWLEDGE}</h3>
    </div>
    <p className='trained-knowledge-desc'>{ALL_TEXTS.YOUR_AI_CHATBOT_IS_AUTOMATICALLY_TRAINED}</p>
  </div>
);

export default AutoTrainInfoBox;
