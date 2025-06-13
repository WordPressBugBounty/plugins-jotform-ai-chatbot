import React, { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

import '../../styles/chattiness.scss';

import { saveInstallment, updateAgent, updateAgentProperty } from '../../api';
import {
  ALL_TEXTS, CHATTINESS_LEVELS, LANGUAGES, TONE_OF_VOICES
} from '../../constants';
import { useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import {
  awaitFor, initAgent, t, toCamelCase
} from '../../utils';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';

// TODO: UI
const AiPersonaStep = () => {
  const {
    asyncDispatch, state, dispatch
  } = useWizard();

  const indexToPercentage = index => `${(Number(index) - 1) * (100 / (CHATTINESS_LEVELS.length - 1))}%`;

  const {
    step,
    agentName,
    agentRole,
    agentLanguage,
    agentToneOfVoice,
    customizations,
    agentChattiness,
    previewAgentId,
    selectedAvatar,
    pageMode,
    themeCustomizations,
    platformSettings: { PROVIDER_API_KEY }
  } = state;

  useEffect(() => {
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  useEffect(() => {
    const refreshAgent = async () => {
      await awaitFor(1000);
      initAgent({
        agentId: previewAgentId, customizations, customAvatarUrl: selectedAvatar.avatarIconLink, ...themeCustomizations
      });
    };
    refreshAgent();
  }, [previewAgentId, customizations, agentName, agentRole, agentChattiness, agentLanguage, selectedAvatar, agentToneOfVoice, pageMode]);

  // agent name
  const updateAgentName = async value => {
    await asyncDispatch(
      () => updateAgent(previewAgentId, { name: value }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentRequest,
      ACTION_CREATORS.updateAgentSuccess,
      ACTION_CREATORS.updateAgentError
    );
  };

  const debouncedUpdateAgentName = useCallback(debounce(updateAgentName, 500), []);

  const handleNameChange = value => {
    dispatch(ACTION_CREATORS.setAgentName(value));
    debouncedUpdateAgentName(value);
  };

  // agent role & chattiness
  const updateAgentProp = async (prop, value) => {
    await asyncDispatch(
      () => updateAgentProperty(previewAgentId, { prop, type: 'agent', value }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentPropertyRequest,
      ACTION_CREATORS.updateAgentPropertySuccess,
      ACTION_CREATORS.updateAgentPropertyError
    );
  };

  const debouncedUpdateAgentProp = useCallback(debounce(updateAgentProp, 500), []);

  const handleAgentPropChange = (prop, value) => {
    if (prop === 'role') dispatch(ACTION_CREATORS.setAgentRole(value));
    if (prop === 'chattiness') dispatch(ACTION_CREATORS.setAgentChattiness(value));
    if (prop === 'language') dispatch(ACTION_CREATORS.setAgentLanguage(value));
    if (prop === 'tone') dispatch(ACTION_CREATORS.setAgentToneOfVoice(value));
    debouncedUpdateAgentProp(prop, value);
  };

  const roleOptions = ['Customer Service Agent', 'Human Resources Agent', 'Contact Sales Agent'];

  return (
    <>
      <div className='jfpContent-wrapper--title'>
        <h2>{t(ALL_TEXTS.AI_PERSONA)}</h2>
        <p>{t(ALL_TEXTS.WRITE_AND_CUSTOMIZE_HOW_AI_TALKS)}</p>
      </div>
      <div className='jfpContent-wrapper--ai-persona'>
        {/* agent name */}
        <div className='jfpContent-wrapper--ai-persona-title'>
          <div>
            <h3>{t(ALL_TEXTS.AGENT_NAME)}</h3>
            <p>{t(ALL_TEXTS.GIVE_A_NAME_TO_YOUR_AGENT_THAT_WILL_BE_DISPLAYED_IN_THE_CONVERSATION)}</p>
          </div>
          <input
            type='text'
            value={agentName}
            className='jfpContent-wrapper--ai-persona-input'
            onChange={e => handleNameChange(e.target.value)}
          />
        </div>
        <hr className='jfpContent-wrapper--line line-2x' />
        {/* agent role */}
        <div className='jfpContent-wrapper--ai-persona-title'>
          <div>
            <h3>{t(ALL_TEXTS.AGENT_ROLE)}</h3>
            <p>{t(ALL_TEXTS.DESCRIPTION_YOUR_AGENTS_JOB_TITLE)}</p>
          </div>
          <input
            type='text'
            value={agentRole}
            className='jfpContent-wrapper--ai-persona-input'
            onChange={e => handleAgentPropChange('role', e.target.value)}
          />
          <div className='role-options'>
            {roleOptions.map(option => (
              <Button
                key={option}
                variant='ghost'
                rounded
                title={option}
                size='small'
                onClick={() => {
                  handleAgentPropChange('role', option);
                }}
                className='color-navy-800 bg-blue-100 hover:outline-blue-200 hover:outline text-overflow-all'
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <hr className='jfpContent-wrapper--line line-2x' />
        {/* agent chattiness */}
        <div className='jfpContent-wrapper--ai-persona-title'>
          <div>
            <h3>{t(ALL_TEXTS.CHATTINESS)}</h3>
            <p>{t(ALL_TEXTS.SPECIFY_THE_DESIRED_LEVEL_OF_DETAIL_IN_THE_AGENTS_RESPONSES)}</p>
          </div>
          <input
            className='chattiness-slider'
            type='range'
            min='1'
            max={CHATTINESS_LEVELS.length}
            value={agentChattiness}
            onChange={e => handleAgentPropChange('chattiness', e.target.value)}
            style={{ '--value': `${indexToPercentage(agentChattiness) || '0%'}` }}
          />
          <div className='chattiness-slider--labels'>
            {CHATTINESS_LEVELS.map(level => (
              <div key={level.title}>
                <span>{level.title}</span>
                <span>{level.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <hr className='jfpContent-wrapper--line line-2x' />
        {/* default language */}
        <div className='jfpContent-wrapper--ai-persona-title'>
          <div>
            <h3>{t(ALL_TEXTS.DEFAULT_LANGUAGE)}</h3>
            <p>{t(ALL_TEXTS.SELECT_THE_LANGUAGE)}</p>
          </div>
          <Dropdown
            className='max-w-xs'
            colorStyle='default'
            size='small'
            theme='light'
            value={agentLanguage}
            onChange={value => handleAgentPropChange('language', value)}
          >
            {LANGUAGES.map(({ value, text, icon }) => (
              <option
                key={value}
                value={value}
              >
                {`${icon} ${t(text)}`}
              </option>
            ))}
          </Dropdown>
        </div>
        <hr className='jfpContent-wrapper--line line-2x' />
        {/* tone of voice */}
        <div className='jfpContent-wrapper--ai-persona-title'>
          <div>
            <h3>{t(ALL_TEXTS.TONE_OF_VOICE)}</h3>
            <p>{t(ALL_TEXTS.SELECT_HOW_TO_COMMUNICATE)}</p>
          </div>
          <Dropdown
            className='max-w-xs'
            colorStyle='default'
            size='small'
            theme='light'
            value={agentToneOfVoice}
            onChange={value => handleAgentPropChange('tone', value)}
          >
            {TONE_OF_VOICES.map(({ value, text, emoji }) => (
              <option
                key={value}
                value={value}
              >
                {`${emoji} ${t(text)}`}
              </option>
            ))}
          </Dropdown>
        </div>
      </div>
      <div className='jfpContent-wrapper--actions'>
        <BackButton />
        <NextButton />
      </div>
    </>
  );
};

export default AiPersonaStep;
