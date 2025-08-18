import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import debounce from 'lodash/debounce';

import { saveInstallment, updateAgentProperty } from '../../api';
import {
  ALL_TEXTS, CUSTOMIZATION_KEYS, GREETING_TEXT_REQ_DEBOUNCE_TIMEOUT, OPEN_BY_DEFAULT_OPTIONS, POSITION, VERBAL_TOGGLE,
  VISIBILITY_LAYOUT
} from '../../constants';
import { useInputFocusOut, useWizard } from '../../hooks';
import { ACTION_CREATORS } from '../../store';
import { initAgent, t, toCamelCase } from '../../utils';
import BackButton from '../BackButton';
import LayoutPicker from '../LayoutPicker';
import NextButton from '../NextButton';
import Dropdown from '../UI/Dropdown';
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

  const greetingMessageTextareaRef = useRef();
  const refreshPreviewForGreetingMessage = useInputFocusOut(greetingMessageTextareaRef);

  const {
    greeting, greetingMessage, pulse, position, autoOpenChatIn, layout
  } = customizations;

  const [selectedLayout, setSelectedLayout] = useState(layout);
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
  }, [
    previewAgentId,
    selectedAvatar,
    themeCustomizations,
    refreshPreviewForGreetingMessage,
    customizations[CUSTOMIZATION_KEYS.GREETING],
    customizations[CUSTOMIZATION_KEYS.PULSE],
    customizations[CUSTOMIZATION_KEYS.POSITION],
    customizations[CUSTOMIZATION_KEYS.AUTO_OPEN_CHAT],
    customizations[CUSTOMIZATION_KEYS.LAYOUT]
  ]);

  const updateCustomization = async ({ key, value }) => {
    const updatedCustomizations = { ...customizations, [key]: value };
    await asyncDispatch(
      () => updateAgentProperty(previewAgentId, { prop: 'popover', type: 'embed', value: JSON.stringify(updatedCustomizations) }, PROVIDER_API_KEY),
      ACTION_CREATORS.updateAgentPropertyRequest,
      ACTION_CREATORS.updateAgentPropertySuccess,
      ACTION_CREATORS.updateAgentPropertyError
    );
  };

  const handleChangeLayout = newLayout => {
    if (newLayout === selectedLayout) return;
    setSelectedLayout(newLayout);
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.LAYOUT, newLayout));
    updateCustomization({ key: CUSTOMIZATION_KEYS.LAYOUT, value: newLayout });
    saveInstallment(`layout_${newLayout}`);
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

  const debouncedUpdateCustomization = useCallback(debounce(updateGreetingText, GREETING_TEXT_REQ_DEBOUNCE_TIMEOUT), []);
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

  const handleOpenByDefaultChange = value => {
    dispatch(ACTION_CREATORS.updateCustomization(CUSTOMIZATION_KEYS.AUTO_OPEN_CHAT, value));
    updateCustomization({ key: CUSTOMIZATION_KEYS.AUTO_OPEN_CHAT, value });
  };

  return (
    <>
      <div className='jfpContent-wrapper--title'>
        <h2>{t(ALL_TEXTS.SETUP_YOUR_AI_CHATBOT)}</h2>
        <p>{t(ALL_TEXTS.CONFIGURE_OPTIONS_FOR_AI_CHATBOT)}</p>
      </div>
      <div className='jfpContent-wrapper--customization'>
        {/* layout */}
        <div className='jfpContent-wrapper--customization-layout'>
          <div>
            <h3>{t(ALL_TEXTS.LAYOUT)}</h3>
          </div>
          <LayoutPicker selectedLayout={selectedLayout} onChange={handleChangeLayout} />
        </div>
        <hr className='jfpContent-wrapper--line' />
        {/* position */}
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
        {selectedLayout === VISIBILITY_LAYOUT.MINIMAL && (
          <>
            <hr className='jfpContent-wrapper--line' />
            {/* greeting */}
            <div className='jfpContent-wrapper--customization-title'>
              <div>
                <h3>{t(ALL_TEXTS.GREETING)}</h3>
                <p>{t(ALL_TEXTS.SHOW_A_MESSAGE)}</p>
              </div>
              <Toggle checked={greetingBool} onChange={() => handleChangeGreeting(!greetingBool)} />
            </div>
            <Textarea
              ref={greetingMessageTextareaRef}
              maxLength={80}
              value={greetingMessageState}
              placeholder={t(ALL_TEXTS.HOW_CAN_I_HELP_YOU)}
              style={{ height: '80px' }}
              onChange={e => handleChangeGreetingText(e.target.value)}
              disabled={!greetingBool}
            />
            <hr className='jfpContent-wrapper--line' />
            {/* open by default */}
            <div className='customize-option open'>
              <div className='jfpContent-wrapper--customization-title'>
                <div>
                  <h3>{t(ALL_TEXTS.OPEN_BY_DEFAULT)}</h3>
                  <p>{t(ALL_TEXTS.CHOOSE_WHEN_CHATBOT_WILL_APPEAR)}</p>
                </div>
              </div>
              <Dropdown
                colorStyle='default'
                size='small'
                theme='light'
                value={autoOpenChatIn}
                onChange={value => handleOpenByDefaultChange(value)}
              >
                {OPEN_BY_DEFAULT_OPTIONS.map(({ value, text }) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {t(text)}
                  </option>
                ))}
              </Dropdown>
            </div>
            <hr className='jfpContent-wrapper--line' />
            {/* pulse */}
            <div className='jfpContent-wrapper--customization-title'>
              <div>
                <h3>{t(ALL_TEXTS.PULSING)}</h3>
                <p>{t(ALL_TEXTS.ADD_A_PULSE_EFFECT)}</p>
              </div>
              <Toggle checked={pulseBool} onChange={() => handleChangePulsing(!pulseBool)} />
            </div>
          </>
        )}
      </div>
      <div className='jfpContent-wrapper--actions'>
        <BackButton />
        <NextButton />
      </div>
    </>
  );
};

export default CustomizationStep;
