import React, { useEffect } from 'react';
import { object } from 'prop-types';

import {
  fetcUser, interactWithPlatform,
  saveInstallment
} from '../../api';
import IconArrowRight from '../../assets/svg/IconArrowRight.svg';
import LogoJotformColor from '../../assets/svg/LogoJotformColor.svg';
import { ALL_TEXTS } from '../../constants';
import { useOAuth, useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import {
  awaitFor, isGuest, platformSettings, t,
  toCamelCase
} from '../../utils';
import Button from '../UI/Button';

const InitialStep = ({
  customTexts = {}
}) => {
  const { state, dispatch, asyncDispatch } = useWizard();
  const {
    user, step, platformSettings: { PROVIDER_URL }, refetchUser
  } = state;

  const { buttonRef, isLoading, apiKey } = useOAuth(PROVIDER_URL);
  const shouldOAuth = !user || isGuest(user);

  // fetch user
  useEffect(() => {
    if (!apiKey) return;
    platformSettings.PROVIDER_API_KEY = apiKey;
    dispatch(ACTION_CREATORS.setProviderApiKey(apiKey));
    const fetchUserAsync = async () => {
      await awaitFor(1000);
      await asyncDispatch(
        () => fetcUser(apiKey),
        ACTION_CREATORS.fetchUserRequest,
        ACTION_CREATORS.fetchUserSuccess,
        ACTION_CREATORS.fetchUserError
      );
    };
    fetchUserAsync();
  }, [apiKey, refetchUser]);

  // save jotform api key to platform
  useEffect(() => {
    if (!apiKey) return;
    const saveProviderApiKey = async () => {
      const dataApiKey = { action: 'update', key: 'apiKey', value: apiKey };
      await asyncDispatch(
        () => interactWithPlatform(dataApiKey),
        ACTION_CREATORS.saveProviderApiKeyRequest,
        ACTION_CREATORS.saveProviderApiKeySuccess,
        ACTION_CREATORS.saveProviderApiKeyError
      );
    };
    saveProviderApiKey();
  }, [apiKey]);

  useEffect(() => {
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  const handleStartClick = async () => {
    saveInstallment(`letsStartButton_${toCamelCase(step)}Step`);
    if (shouldOAuth) return;
    dispatch(ACTION_CREATORS.nextStep());
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
        loader={isLoading}
        buttonRef={shouldOAuth ? buttonRef : { current: null }}
        className='lets-start buttonRTL'
        disabled={!PROVIDER_URL}
        data-fs-element={`Step: ${step} - ${ALL_TEXTS.LETS_START} Button`}
      >
        {t(ALL_TEXTS.LETS_START)}
      </Button>
    </div>
  );
};

export default InitialStep;

InitialStep.propTypes = {
  customTexts: object
};
