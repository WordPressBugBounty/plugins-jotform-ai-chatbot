import React, { useCallback, useEffect } from 'react';

import {
  disconnectWoocommerceStore as disconnectWoocommerceStoreReq,
  getWoocommerceSettings as getWoocommerceSettingsReq,
  setWoocommerceSettings as setWoocommerceSettingsReq,
  updateWoocommerceSettings as updateWoocommerceSettingsReq
} from '../../api';
import { ALL_TEXTS } from '../../constants';
import { useEffectIgnoreFirst, useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { t } from '../../utils';
import Abilities from './woocommerce/Abilities';
import ConnectedStore from './woocommerce/ConnectedStore';
import StoreConnection from './woocommerce/StoreConnection';

const Woocommerce = () => {
  const {
    asyncDispatch, state
  } = useWizard();

  const {
    previewAgentId,
    platformSettings: { PROVIDER_API_KEY },
    woocommerce: { consumerKey, abilities, isConnected }
  } = state;

  const integrationOptions = Object.keys(abilities).filter(abilityKey => abilities[abilityKey] === true);

  const setWoocommerceSettings = useCallback(
    async ({ key = '', secret = '' } = {}) => {
      const data = {
        ...(key && { consumerKey: key }),
        ...(secret && { consumerSecret: secret }),
        storeUrl: window.location.hostname,
        agentId: previewAgentId,
        integrationOptions
      };
      await asyncDispatch(
        () => setWoocommerceSettingsReq(data, PROVIDER_API_KEY),
        ACTION_CREATORS.setWoocommerceSettingsRequest,
        ACTION_CREATORS.setWoocommerceSettingsSuccess,
        ACTION_CREATORS.setWoocommerceSettingsError
      );
    },
    [consumerKey, previewAgentId, integrationOptions]
  );

  const updateWoocommerceSettings = useCallback(
    async () => {
      const data = {
        storeUrl: window.location.hostname,
        integrationOptions
      };
      await asyncDispatch(
        () => updateWoocommerceSettingsReq(previewAgentId, data, PROVIDER_API_KEY),
        ACTION_CREATORS.setWoocommerceSettingsRequest,
        ACTION_CREATORS.setWoocommerceSettingsSuccess,
        ACTION_CREATORS.setWoocommerceSettingsError
      );
    },
    [previewAgentId, integrationOptions]
  );

  const getWoocommerceSettings = useCallback(async () => {
    await asyncDispatch(
      () => getWoocommerceSettingsReq(previewAgentId, window.location.hostname, PROVIDER_API_KEY),
      ACTION_CREATORS.getWoocommerceSettingsRequest,
      ACTION_CREATORS.getWoocommerceSettingsSuccess,
      ACTION_CREATORS.getWoocommerceSettingsError
    );
  }, [previewAgentId]);

  const disconnectWoocommerceStore = useCallback(async () => {
    const data = {
      storeUrl: window.location.hostname,
      agentId: previewAgentId
    };
    await asyncDispatch(
      () => disconnectWoocommerceStoreReq(data, PROVIDER_API_KEY),
      ACTION_CREATORS.disconnectWoocommerceStoreRequest,
      ACTION_CREATORS.disconnectWoocommerceStoreSuccess,
      ACTION_CREATORS.disconnectWoocommerceStoreError
    );
  }, [previewAgentId]);

  useEffect(() => {
    getWoocommerceSettings();
  }, []);

  useEffectIgnoreFirst(() => {
    updateWoocommerceSettings();
  }, [abilities]);

  return (
    <div className='jfpContent-wrapper--settings-options-wrapper'>
      <h2 className='jfpContent-wrapper--settings-options-wrapper-title'>
        {t(ALL_TEXTS.WOOCOMMERCE_STORE_SETTINGS)}
      </h2>
      {!isConnected
        ? <StoreConnection setWoocommerceSettings={setWoocommerceSettings} />
        : <ConnectedStore disconnectStore={disconnectWoocommerceStore} />}
      <Abilities
        isConnected={isConnected}
      />
    </div>
  );
};

export default Woocommerce;
