import React from 'react';
import { func, string } from 'prop-types';

import { ALL_TEXTS, VISIBILITY_LAYOUT } from '../constants';
import { useWizard } from '../hooks';
import { t } from '../utils';
import { IconArrowUp } from './UI/Icon';

const LayoutPicker = ({ selectedLayout, onChange }) => {
  const { state } = useWizard();

  const {
    selectedAvatar,
    themeCustomizations
  } = state;

  return (
    <div className='layout-container'>
      <div className='layout-wrapper'>
        <h4>{t(ALL_TEXTS.EXTENDED)}</h4>
        <button
          type='button'
          className={`layout-item default ${selectedLayout === VISIBILITY_LAYOUT.EXTENDED ? 'active' : ''}`}
          onClick={() => onChange(VISIBILITY_LAYOUT.EXTENDED)}
        >
          <div className='top-cont'>
            <p className='greeting'>Hi! How can I assist you?</p>
            <div className='suggestion-btn'>Learn more</div>
          </div>
          <div className='bottom-cont'>
            <div className='agent-img' style={{ background: themeCustomizations.agentBackgroundStart }}>
              <img src={selectedAvatar.avatarIconLink} alt='Agent Avatar' />
            </div>
            <p className='agent-input'>Ask AI</p>
            <div className='agent-send' style={{ background: themeCustomizations.sendButtonBackground }}>
              <IconArrowUp style={{ fill: themeCustomizations.sendButtonIconColor }} />
            </div>
          </div>
        </button>
      </div>
      <div className='layout-wrapper'>
        <h4>{t(ALL_TEXTS.MINIMAL)}</h4>
        <button
          type='button'
          className={`layout-item minimal ${selectedLayout === VISIBILITY_LAYOUT.MINIMAL ? 'active' : ''}`}
          onClick={() => onChange(VISIBILITY_LAYOUT.MINIMAL)}
        >
          <div className='greeting-bubble'>
            <span>Hi! How can I assist you?</span>
          </div>
          <div className='agent-img' style={{ background: themeCustomizations.agentBackgroundStart }}>
            <img src={selectedAvatar.avatarIconLink} alt='Agent Avatar' />
          </div>
        </button>
      </div>
    </div>
  );
};

LayoutPicker.propTypes = {
  selectedLayout: string.isRequired,
  onChange: func.isRequired
};

export default LayoutPicker;
