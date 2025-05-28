import React, { useEffect, useMemo, useReducer } from 'react';
import { node, shape } from 'prop-types';

import { fetcUser, interactWithPlatform } from '../api';
import { initializePlatformLayer } from '../api/platformLayerSingleton';
import {
  ACTION_CREATORS, initialState, wizardReducer
} from '../store';
import { createAsyncDispatch, platformSettings as platformSettingsSingleton } from '../utils';
import { WizardContext } from './WizardContext';

export const WizardProvider = ({
  children,
  user: userProp = null
}) => {
  const [state, dispatch] = useReducer(wizardReducer, {
    ...initialState, user: userProp
  });

  const {
    isInitialPlatformSettingsReady,
    platformSettings: { PROVIDER_API_KEY },
    refetchUser
  } = state;

  // async dispatch
  const asyncDispatch = createAsyncDispatch(dispatch);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    asyncDispatch
  }), [
    state,
    dispatch,
    asyncDispatch
  ]);

  // platform settings & init platform layer
  useEffect(() => {
    const PLATFORM_API_URL = document.getElementById('platform_api_url').value;
    const PLATFORM_NONCE = document.getElementById('_nonce').value;
    const PLATFORM_REFERER = document.getElementsByName('_wp_http_referer')[0].value;
    platformSettingsSingleton.PLATFORM_API_URL = PLATFORM_API_URL;
    platformSettingsSingleton.PLATFORM_NONCE = PLATFORM_NONCE;
    platformSettingsSingleton.PLATFORM_REFERER = PLATFORM_REFERER;
    initializePlatformLayer(PLATFORM_API_URL);
    dispatch(ACTION_CREATORS.setPlatformSettings({ ...platformSettingsSingleton }));
  }, [platformSettingsSingleton]);

  // get platform settings
  useEffect(() => {
    if (!isInitialPlatformSettingsReady) return;
    const fetchPlatformSettings = async () => {
      const data = { action: 'createSettings' };
      await asyncDispatch(
        () => interactWithPlatform(data),
        ACTION_CREATORS.getPlatformSettingsRequest,
        ACTION_CREATORS.getPlatformSettingsSuccess,
        ACTION_CREATORS.getPlatformSettingsError
      );
    };
    fetchPlatformSettings();
  }, [isInitialPlatformSettingsReady]);

  // fetch user
  useEffect(() => {
    if (!PROVIDER_API_KEY) return;
    const fetchUserAsync = async () => {
      await asyncDispatch(
        () => fetcUser(PROVIDER_API_KEY),
        ACTION_CREATORS.fetchUserRequest,
        ACTION_CREATORS.fetchUserSuccess,
        ACTION_CREATORS.fetchUserError
      );
    };
    fetchUserAsync();
  }, [PROVIDER_API_KEY, refetchUser]);

  return (
    <WizardContext.Provider
      value={contextValue}
    >
      {children}
    </WizardContext.Provider>
  );
};

WizardProvider.propTypes = {
  user: shape({}),
  children: node.isRequired
};
