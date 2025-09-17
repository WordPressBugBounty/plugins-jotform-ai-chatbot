import React from 'react';

import { ALL_TEXTS, STEPS } from '../../../constants';
import { useWizard } from '../../../hooks';
import { ACTION_CREATORS } from '../../../store';
import { translationRenderer } from '../../../utils';

const NoAgentError = () => {
  const { dispatch } = useWizard();

  const handleClick = () => {
    dispatch(ACTION_CREATORS.setStep(STEPS.USECASE_SELECTION));
  };

  return (
    <p className='jfpContent-wrapper--settings-options-input-error'>
      {translationRenderer(ALL_TEXTS.NO_AGENT_ERROR)({
        renderer1: str => (
          <button type='button' className='jfpContent-wrapper--settings-options-link-button' onClick={handleClick}>{str}</button>)
      })}
    </p>
  );
};

export default NoAgentError;
