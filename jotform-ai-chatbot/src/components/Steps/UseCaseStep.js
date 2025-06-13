import React, { useEffect, useRef, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import {
  apiUsePlatformAgent,
  getAIAgentsLimitExceeded,
  saveInstallment
} from '../../api';
import IconArrowRight from '../../assets/svg/IconArrowRight.svg';
import { ALL_TEXTS, PROMPTS } from '../../constants';
import { useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { isMobile, t, toCamelCase } from '../../utils';
import BackButton from '../BackButton';
import PromptSuggestion from '../PromptSuggestion';
import AgentRadio from '../UI/AgentRadio';
import Button from '../UI/Button';
import Tab from '../UI/Tab';
import Textarea from '../UI/Textarea';

const UseCaseStep = () => {
  const textareaRef = useRef();

  const { state, dispatch, asyncDispatch } = useWizard();

  const {
    prompt,
    step,
    isUseAgentLoading,
    allAgents: {
      items: existingAgents
    },
    platformSettings: {
      PLATFORM,
      PLATFORM_DOMAIN,
      PLATFORM_PAGE_CONTENTS,
      PLATFORM_KNOWLEDGE_BASE,
      PROVIDER_API_KEY
    }
  } = state;

  const [activeButton, setActiveButton] = useState(null);
  const [useCaseText, setUseCaseText] = useState('');
  const [tab, setTab] = useState('create');
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    if (!useCaseText) return;
    dispatch(ACTION_CREATORS.setPrompt(useCaseText));
  }, [useCaseText]);

  useEffect(() => {
    dispatch(ACTION_CREATORS.resetAvatars());
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  const isCreateButtonDisabled = (tab === 'create' && isEmpty(prompt)) || (tab === 'select' && isEmpty(selectedAgent));

  const handlePromptChange = value => {
    if (value === '') {
      setActiveButton(null);
      setUseCaseText('');
    }
    dispatch(ACTION_CREATORS.setPrompt(value));
  };

  const handlePlatformUseAgent = async () => {
    // check limit
    const result = await asyncDispatch(
      () => getAIAgentsLimitExceeded(PROVIDER_API_KEY),
      ACTION_CREATORS.checkAIChatbotLimitsRequest,
      ACTION_CREATORS.checkAIChatbotLimitsSuccess,
      ACTION_CREATORS.checkAIChatbotLimitsError
    );
    const isLimitExceeded = typeof result === 'boolean' && result === true;
    if (isLimitExceeded) return;

    // use platform agent
    const data = {
      platform: PLATFORM,
      domain: PLATFORM_DOMAIN,
      pageContents: PLATFORM_PAGE_CONTENTS,
      knowledgeBase: PLATFORM_KNOWLEDGE_BASE.urls
    };

    if (tab === 'create') {
      Object.assign(data, { prompt });
    }

    if (tab === 'select') {
      Object.assign(data, { existingAgentID: selectedAgent });
    }

    try {
      saveInstallment(`createAiChatbotButton_${toCamelCase(step)}Step`);
      await asyncDispatch(
        () => apiUsePlatformAgent(data, PROVIDER_API_KEY),
        ACTION_CREATORS.usePlatformAgentRequest,
        ACTION_CREATORS.usePlatformAgentSuccess,
        ACTION_CREATORS.usePlatformAgentError,
        { tryOnce: true }
      );
    } catch (error) {
      console.error('error while creating platform agent: ', error);
    }
  };

  const handleSelect = (suggestion) => {
    handlePromptChange(suggestion);
  };

  useEffect(() => {
    handlePromptChange('');
    setSelectedAgent('');
  }, [tab]);

  return (
    <>
      <div className='jfpContent-wrapper--title'>
        <h2>{t(ALL_TEXTS.SETUP_YOUR_AI_CHATBOT)}</h2>
        <p>{t(ALL_TEXTS.USE_TEMPLATE_READY_OR_START_FROM_SCRATCH)}</p>
      </div>
      {!isEmpty(existingAgents) && (
        <div className='jfpContent-wrapper--tabs'>
          <Tab
            label={ALL_TEXTS.DESCRIBE}
            isActive={tab === 'create'}
            onClick={() => setTab('create')}
          />
          <Tab
            label={ALL_TEXTS.SELECT_FROM_AGENTS}
            isActive={tab === 'select'}
            onClick={() => setTab('select')}
          />
        </div>
      )}
      <div className='jfpContent-wrapper--use-cases'>
        {tab === 'create' && (
          <>
            <div className='jfpContent-wrapper--customization-title'>
              <h3>{t(ALL_TEXTS.DESCRIBE_THE_AGENT_YOU_WANT_TO_CREATE)}</h3>
            </div>
            <div className='jfpContent-wrapper--input'>
              <Textarea
                ref={textareaRef}
                placeholder={t(ALL_TEXTS.EXAMPLE_PROVIDE_CUSTOMER_SUPPORT_BY_ANSWERING_FAQS_AND_GUIDING_USERS_THROUGH)}
                style={{ height: '120px' }}
                onChange={(e => handlePromptChange(e.target.value))}
                value={prompt}
              />
              <PromptSuggestion
                ref={textareaRef}
                inputValue={prompt}
                onSelect={handleSelect}
              />
            </div>
            <div className='jfpContent-wrapper--buttons'>
              {PROMPTS.map(data => (
                <Button
                  colorStyle={activeButton === data.buttonText ? 'primary' : 'secondary'}
                  rounded
                  variant={activeButton === data.buttonText ? 'outline' : 'filled'}
                  size='small'
                  onClick={() => {
                    setActiveButton(data.buttonText);
                    setUseCaseText(data.text);
                  }}
                  data-fs-element={`Step: ${step} - ${data.buttonText} Button`}
                >
                  {t(data.buttonText)}
                </Button>
              ))}
            </div>
          </>
        )}
        {tab === 'select' && !isEmpty(existingAgents) && (
          <ul className='jfpContent-wrapper--select-agent'>
            {existingAgents.map(agent => (
              <AgentRadio
                key={agent.id}
                name='selectedAgent'
                value={agent.uuid}
                onChange={() => setSelectedAgent(agent.uuid)}
                avatarImage={agent.avatarIconLink}
                label={agent.title}
                description={`${agent.total_conversation_count} conversations. Last conversation on ${new Date(agent.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                })}`}
              />
            ))}
          </ul>
        )}
      </div>
      <div className='jfpContent-wrapper--actions'>
        {/* use chatbot button */}
        <BackButton />
        <Button
          loader={isUseAgentLoading}
          endIcon={<IconArrowRight />}
          onClick={handlePlatformUseAgent}
          disabled={isCreateButtonDisabled}
          className='forCreateAgent buttonRTL btn-pos-right'
          data-fs-element={`Step: ${step} - ${isMobile() ? ALL_TEXTS.CREATE : ALL_TEXTS.CREATE_AI_CHATBOT} Button`}
        >
          {isMobile() ? t(ALL_TEXTS.CREATE) : t(ALL_TEXTS.CREATE_AI_CHATBOT)}
        </Button>
      </div>
    </>
  );
};

export default UseCaseStep;
