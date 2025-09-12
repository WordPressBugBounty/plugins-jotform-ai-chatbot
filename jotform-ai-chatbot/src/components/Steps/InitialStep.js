import React, { useEffect } from 'react';
import { object } from 'prop-types';

import { saveInstallment } from '../../api';
import IconArrowRight from '../../assets/svg/IconArrowRight.svg';
import LogoJotformColor from '../../assets/svg/LogoJotformColor.svg';
import { ALL_TEXTS, STEPS } from '../../constants';
import { useOAuth, useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { isGuest, t, toCamelCase } from '../../utils';
import NetworkError from '../NetworkError';
import Button from '../UI/Button';
import UnauthorizedApiKeyError from '../UnauthorizedApiKeyError';

const InitialStep = ({
  customTexts = {}
}) => {
  const { state, dispatch } = useWizard();
  const {
    user, step, showNetworkError, isUnauthorizedApiKey
  } = state;

  const { buttonRef } = useOAuth();
  const shouldOAuth = !user || isGuest(user);

  useEffect(() => {
    if (showNetworkError) return;
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  const handleStartClick = async () => {
    saveInstallment('letsStartButton');
    if (shouldOAuth) return;
    dispatch(ACTION_CREATORS.setStep(STEPS.USECASE_SELECTION));
  };

  return (
    <div className='first-step'>
      <div className='first-step--logo'>
        <LogoJotformColor width='148' height='28' />
      </div>
      <h2>{t(customTexts.title || ALL_TEXTS.READ_TO_BUILD_YOUR_AI)}</h2>
      <p>{t(customTexts.subtitle || ALL_TEXTS.CREATE_AND_CUSTOMIZE_YOUR_AI)}</p>
      <Button
        endIcon={<IconArrowRight />}
        onClick={handleStartClick}
        buttonRef={shouldOAuth ? buttonRef : { current: null }}
        className='lets-start buttonRTL'
      >
        {t(ALL_TEXTS.LETS_START)}
      </Button>
      {showNetworkError && <NetworkError />}
      {isUnauthorizedApiKey && <UnauthorizedApiKeyError />}
    </div>
  );
};

export default InitialStep;

InitialStep.propTypes = {
  customTexts: object
};
