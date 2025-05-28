import React, { useCallback, useEffect, useMemo } from 'react';

import {
  getAllAgents, getPlatformAgent, interactWithPlatform
} from '../api';
import { PLATFORMS, STEPS } from '../constants';
import { useWizard } from '../hooks';
import { ACTION_CREATORS } from '../store';
import {
  awaitFor, createEmbed, getRootElement, isGuest, openLimitDialog, resetAgentPreviewRoot
} from '../utils';
import Footer from './Footer';
import Preview from './Preview';
import {
  AiPersonaStep, AvatarStep, CustomizationStep, InitialStep,
  KnowledgeStep, LoadingStep, StyleStep, UseCaseStep, WpPageSelection
} from './Steps';

const Wizard = props => {
  const { state, dispatch, asyncDispatch } = useWizard();

  const {
    user,
    step,
    previewAgentId,
    customizations,
    themeCustomizations,
    isInitialLoading,
    isUseAgentLoading,
    tryGetPlatformAgentOnce,
    isInitialPlatformSettingsReady,
    isLimitDialogVisible,
    allAgents: {
      loading: allAgentsLoading
    },
    platformSettings: {
      PLATFORM_DOMAIN,
      PROVIDER_URL,
      PROVIDER_API_KEY
    }
  } = state;

  // reset agent preview root
  useEffect(() => {
    if (step === STEPS.INITIAL) {
      resetAgentPreviewRoot();
    }
  }, [step]);

  useEffect(() => {
    if (!isLimitDialogVisible) return;
    try {
      openLimitDialog({
        utmContent: 'wordpress-plugin',
        container: getRootElement('#modal-root'),
        onClose: () => dispatch(ACTION_CREATORS.setIsLimitDialogVisible(false))
      });
    } catch (e) {
      dispatch(ACTION_CREATORS.setIsLimitDialogVisible(false));
    }
  }, [isLimitDialogVisible]);

  // fetch agent
  const fetchAgent = useCallback(async (fromTyrOnce = false) => {
    const data = { domain: PLATFORM_DOMAIN, platform: PLATFORMS.WORDPRESS };
    await asyncDispatch(
      () => getPlatformAgent(data, PROVIDER_API_KEY),
      ACTION_CREATORS.getPlatformAgentRequest,
      ACTION_CREATORS.getPlatformAgentSuccess,
      ACTION_CREATORS.getPlatformAgentError,
      fromTyrOnce ? STEPS.CUSTOMIZATION : STEPS.WP_PAGE_SELECTION
    );
  }, [PROVIDER_API_KEY, PLATFORM_DOMAIN]);

  const fetchExistingAgents = useCallback(async () => {
    if (!PROVIDER_API_KEY) return;

    await asyncDispatch(
      () => getAllAgents(PROVIDER_API_KEY),
      ACTION_CREATORS.getAllAgentsRequest,
      ACTION_CREATORS.getAllAgentsSuccess,
      ACTION_CREATORS.getAllAgentsError
    );
  }, [PROVIDER_API_KEY]);

  // fetch platform agent & existing agents if user is logged in
  useEffect(() => {
    const shouldFetchAgent = user && !isGuest(user) && PROVIDER_API_KEY;
    if (!shouldFetchAgent) return;
    fetchExistingAgents();
    fetchAgent();
  }, [user, PROVIDER_API_KEY]);

  // try fetch platform agent once to handle 502 use agent error
  useEffect(() => {
    if (!tryGetPlatformAgentOnce) return;
    const awaitAndFetchAgent = async () => {
      await awaitFor(8000);
      await fetchAgent(true);
      dispatch(ACTION_CREATORS.setTryGetPlatformAgentOnce(false));
    };
    awaitAndFetchAgent();
  }, [tryGetPlatformAgentOnce]);

  // is loader visible
  const isLoaderVisible = useMemo(() => (
    PROVIDER_API_KEY
    && ((isInitialLoading) || !isInitialPlatformSettingsReady || isUseAgentLoading || tryGetPlatformAgentOnce || allAgentsLoading))
    || isUseAgentLoading, [PROVIDER_API_KEY, isInitialLoading, isInitialPlatformSettingsReady, isUseAgentLoading, tryGetPlatformAgentOnce, allAgentsLoading]);

  // save platform agent embed
  const savePlatformAgentEmbed = async (key = 'embed') => {
    const embedCode = createEmbed({
      agentId: previewAgentId, chatbotDomain: PROVIDER_URL, ...customizations, ...themeCustomizations
    });
    const dataEmbed = { action: 'update', key, value: global.btoa(global.encodeURIComponent(embedCode)) };
    await asyncDispatch(
      () => interactWithPlatform(dataEmbed),
      ACTION_CREATORS.savePlatformAgentEmbedRequest,
      ACTION_CREATORS.savePlatformAgentEmbedSuccess,
      ACTION_CREATORS.savePlatformAgentEmbedError
    );
  };

  // all steps appear in this order
  const stepMap = {
    [STEPS.INITIAL]: InitialStep,
    [STEPS.USECASE_SELECTION]: UseCaseStep,
    [STEPS.CUSTOMIZATION]: CustomizationStep,
    [STEPS.AI_PERSONA]: AiPersonaStep,
    [STEPS.AVATAR]: AvatarStep,
    [STEPS.STYLE]: StyleStep,
    [STEPS.KNOWLEDGE]: KnowledgeStep,
    [STEPS.WP_PAGE_SELECTION]: WpPageSelection
  };

  const CurrentStep = stepMap[step];

  return (
    <>
      <div
        data-step={step}
        className='chatbot-container chatbot-container--platformmode'
      >
        {isLoaderVisible
          ? (
            <LoadingStep
              key='loading-step'
              type={isInitialLoading ? 'default' : 'text'}
            />
          )
          : (
            <>
              <div className='content-wrapper' data-step={step}>
                <CurrentStep
                  {...props}
                  savePlatformAgentEmbed={savePlatformAgentEmbed}
                />
              </div>
              <Preview savePlatformAgentEmbed={savePlatformAgentEmbed} />
            </>
          )}
      </div>
      <Footer />
    </>
  );
};

export default Wizard;
