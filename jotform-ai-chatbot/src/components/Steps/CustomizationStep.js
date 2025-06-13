import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { saveInstallment, updateAgentProperty } from '../../api';
import {
  ALL_TEXTS, CUSTOMIZATION_KEYS, POSITION, VERBAL_TOGGLE
} from '../../constants';
import { useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { initAgent, t, toCamelCase } from '../../utils';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import Radio from '../UI/Radio';
import Textarea from '../UI/Textarea';
import Toggle from '../UI/Toggle';

const CustomizationStep = () => {
  const { state, dispatch, asyncDispatch } = useWizard();

  const {
    step,
    previewAgentId,
    customizations,
    themeCustomizations,
    selectedAvatar,
    platformSettings: {
      PROVIDER_API_KEY
    }
  } = state;

  const {
    greeting, greetingMessage, pulse, position
  } = customizations;

  const [greetingMessageState, setGreetingMessageState] = useState(greetingMessage);

  const pulseBool = pulse === VERBAL_TOGGLE.YES;
  const greetingBool = greeting === VERBAL_TOGGLE.YES;

  useEffect(() => {
    saveInstallment(`${toCamelCase(step)}Step`);
  }, []);

  useEffect(() => {
    initAgent({
      agentId: previewAgentId, customizations, customAvatarUrl: selectedAvatar.avatarIconLink, ...themeCustomizations
    });
  }, [previewAgentId, customizations, selectedAvatar, themeCustomizations]);

  const updateCustomization = async ({ key, value }) => {
    const updatedCustomizations = { ...customizations, [key]: value };
    await asyncDispatch(
      () => updateAgentProperty(previewAgentId, { prop: 'popover', type: 'embed', value: JSON.stringify(updatedCustomizations) }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentPropertyRequest,
      ACTION_CREATORS.updateAgentPropertySuccess,
      ACTION_CREATORS.updateAgentPropertyError
    );
  };

  const handleChangeGreeting = value => {
    const verbalVal = value ? VERBAL_TOGGLE.YES : VERBAL_TOGGLE.NO;
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.GREETING, verbalVal));
    updateCustomization({ key: CUSTOMIZATION_KEYS.GREETING, value: verbalVal });
  };

  const updateGreetingText = value => {
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.GREETING_MESSAGE, value));
    updateCustomization({ key: CUSTOMIZATION_KEYS.GREETING_MESSAGE, value });
  };

  const debouncedUpdateCustomization = useCallback(debounce(updateGreetingText, 1000), []);
  const handleChangeGreetingText = value => {
    setGreetingMessageState(value);
    debouncedUpdateCustomization(value);
  };

  const handleChangePulsing = value => {
    const verbalVal = value ? VERBAL_TOGGLE.YES : VERBAL_TOGGLE.NO;
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.PULSE, verbalVal));
    updateCustomization({ key: CUSTOMIZATION_KEYS.PULSE, value: verbalVal });
  };

  const handleChangePosition = value => {
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.POSITION, value));
    updateCustomization({ key: CUSTOMIZATION_KEYS.POSITION, value });
  };

  return (
    <>
      <div className='jfpContent-wrapper--title'>
        <h2>{t(ALL_TEXTS.SETUP_YOUR_AI_CHATBOT)}</h2>
        <p>{t(ALL_TEXTS.CONFIGURE_OPTIONS_FOR_AI_CHATBOT)}</p>
      </div>
      <div className='jfpContent-wrapper--customization'>
        <div className='jfpContent-wrapper--customization-title'>
          <div>
            <h3>{t(ALL_TEXTS.GREETING)}</h3>
            <p>{t(ALL_TEXTS.SHOW_A_MESSAGE)}</p>
          </div>
          <Toggle checked={greetingBool} onChange={() => handleChangeGreeting(!greetingBool)} />
        </div>
        <Textarea
          maxLength={80}
          value={greetingMessageState}
          placeholder={t(ALL_TEXTS.HOW_CAN_I_HELP_YOU)}
          style={{ height: '80px' }}
          onChange={e => handleChangeGreetingText(e.target.value)}
          disabled={!greetingBool}
        />
        <hr className='jfpContent-wrapper--line' />
        <div className='jfpContent-wrapper--customization-title'>
          <div>
            <h3>{t(ALL_TEXTS.PULSING)}</h3>
            <p>{t(ALL_TEXTS.ADD_A_PULSE_EFFECT)}</p>
          </div>
          <Toggle checked={pulseBool} onChange={() => handleChangePulsing(!pulseBool)} />
        </div>
        <hr className='jfpContent-wrapper--line' />
        <div className='jfpContent-wrapper--customization-title'>
          <div>
            <h3>{t(ALL_TEXTS.POSITION)}</h3>
            <p>{t(ALL_TEXTS.CHOOSE_THE_AI_AGENT)}</p>
          </div>
        </div>
        <ul className='jfpContent-wrapper--customization-position'>
          <li>
            <Radio
              label={t(ALL_TEXTS.LEFT)}
              onChange={() => handleChangePosition(POSITION.LEFT)}
              size='small'
              value={POSITION.LEFT}
              name='position'
              checked={position === POSITION.LEFT}
            />
          </li>
          <li>
            <Radio
              description={`(${t(ALL_TEXTS.DEFAULT)})`}
              label={t(ALL_TEXTS.RIGHT)}
              onChange={() => handleChangePosition(POSITION.RIGHT)}
              size='small'
              value={POSITION.RIGHT}
              name='position'
              checked={position === POSITION.RIGHT}
            />
          </li>
        </ul>
      </div>
      <div className='jfpContent-wrapper--actions'>
        <BackButton />
        <NextButton />
      </div>
    </>
  );
};

export default CustomizationStep;
