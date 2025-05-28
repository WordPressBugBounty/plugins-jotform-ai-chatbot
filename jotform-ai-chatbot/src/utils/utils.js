import jsBeautify from 'js-beautify';
import { createRoot } from 'react-dom/client';

import ChatbotPlaceholder from '../assets/svg/chatbot-no-avatar.svg';
import {
  CUSTOMIZATION_KEYS, GREETING_MESSAGE, KEY_KEYCODE_LIST, PLATFORMS, URL_REGEX
} from '../constants';
import { platformSettings } from './platformSingleton';

export const getRootElement = selector => {
  if (document.querySelector(selector)) {
    return document.querySelector(selector);
  }
  const rootEl = document.createElement('div');
  if (selector.startsWith('#')) {
    rootEl.id = selector.slice(1);
  }
  if (selector.startsWith('.')) {
    rootEl.classList.add(selector.slice(1));
  }
  document.body.appendChild(rootEl);
  return rootEl;
};

export const isMobile = () => global.innerWidth <= 1024;

export const beautifedMarkup = code => jsBeautify.html_beautify(code, { indent_size: 2, wrap_line_length: 100, inline: ['*'] });

export const removeObjectKey = (obj, keyToRemove) => {
  const { [keyToRemove]: _, ...newObj } = obj;
  return newObj;
};

export const resetPlatformPages = pages => pages.map(page => ({ ...page, selected: '1' }));

export const unicodeEncode = input => String(input)
  .replace(/\\/g, '\\\\') // Escape backslashes
  .replace(/"/g, '\\"') // Escape double quotes
  .replace(/'/g, "\\'") // Escape single quotes
  .replace(/</g, '\\u003C') // Escape less-than sign
  .replace(/>/g, '\\u003E') // Escape greater-than sign
  .replace(/&/g, '\\u0026') // Escape ampersand
  .replace(/\//g, '\\/'); // Escape forward slash

export const getEmbedSource = () => platformSettings.PROVIDER_CHATBOT_EMBED_SRC;

export const createEmbed = ({
  agentId,
  greeting,
  greetingMessage,
  pulse,
  position,
  chatbotDomain,
  agentBackgroundStart,
  agentBackgroundEnd,
  sendButtonBackground,
  sendButtonIconColor
}) => {
  const cbDomain = `${chatbotDomain}`;
  return `<script src="${getEmbedSource()}"></script>
  <script>
    window.addEventListener("DOMContentLoaded", function() {
      window.AgentInitializer.init({
        rootId: "JotformAgent-${unicodeEncode(agentId)}",
        formID: "${unicodeEncode(agentId)}",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "${unicodeEncode(chatbotDomain ? cbDomain : global.location.origin)}",
        isInitialOpen: false,
        isDraggable: false,
        background: "linear-gradient(180deg, ${agentBackgroundStart} 0%, ${agentBackgroundEnd} 100%)",
        buttonBackgroundColor: "${sendButtonBackground}",
        buttonIconColor: "${sendButtonIconColor}",
        variant: false,
        customizations: {
          greeting: "${unicodeEncode(greeting)}",
          greetingMessage: "${unicodeEncode(greetingMessage)}",
          pulse: "${unicodeEncode(pulse)}",
          position: "${unicodeEncode(position)}"
        }
      });
    });
  </script>`;
};

export const resetAgentPreviewRoot = () => {
  const rootEl = document.querySelector('#agent-preview-root');
  if (!rootEl) {
    return;
  }
  const root = createRoot(rootEl);
  root.render(<ChatbotPlaceholder class='chatbot-image' alt='Chatbot Preview' />);
};

// eslint-disable-next-line no-promise-executor-return
export const awaitFor = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getUserAccountType = user => user?.account_type?.name || user?.accountType?.name || user?.account_type || user?.accountType;

export const isGuest = user => getUserAccountType(user) === 'GUEST';

export const getBaseURL = () => {
  const { PLATFORM, PROVIDER_API_URL } = platformSettings;
  return (Object.values(PLATFORMS).includes(PLATFORM) ? PROVIDER_API_URL : '/API');
};

export const isValidHex = color => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color?.trim?.());
};

export const isValidRgba = color => {
  const rgbaRegex = /^rgba\(\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(1|0|0?\.\d+)\s*\)$/;
  return rgbaRegex.test(color?.trim?.());
};

export const classNames = (...arr) => arr.flat().filter(Boolean).join(' ');

export const t = f => f;

// Expects event as parameter
export const prepareKeyList = keyList => Object.keys(KEY_KEYCODE_LIST).filter(key => keyList.indexOf(key) > -1).map(key => ({ key, keyCode: KEY_KEYCODE_LIST[key] }));
export const isPressedKeyFN = keyList => {
  const preparedKeyList = prepareKeyList(keyList);
  return ({ key, keyCode }) => preparedKeyList.filter(({ key: expectedKey, keyCode: expectedKeyCode }) => (expectedKey === key || expectedKeyCode === keyCode)).length > 0;
};
export const isPressedKeyEnter = isPressedKeyFN(['Enter']);

export const safeJSONParse = (str, defVal = {}, allowObj = false) => {
  if (str) {
    if (typeof str === typeof {} && allowObj) {
      return str;
    }
    try {
      return JSON.parse(str);
    } catch (ex) {
      return defVal;
    }
  } else {
    return defVal;
  }
};

const getEmptyInputs = (input, type) => {
  const emptyInputs = [];
  if (typeof input === 'string' && input.trim() === '') {
    emptyInputs.push(type.toLowerCase());
  }
  if (typeof input === 'object') {
    Object.entries(input).forEach(([key, element]) => {
      if (Object.values(element).length > 0 && element.value.trim() === '') {
        emptyInputs.push(key);
      }
    });
  }
  return emptyInputs;
};

export const validateURL = url => (URL_REGEX.test(url));

export const getNonValidInputs = (input, type = 'text') => {
  const nonValidInputs = [];
  if (type === 'url' && typeof input === 'string' && input.trim() !== '' && !validateURL(input)) {
    nonValidInputs.push('invalid-url');
  }
  nonValidInputs.push(...getEmptyInputs(input, type));
  return nonValidInputs;
};

export const convertServerDateToUserTimezone = (date, timeZone, dateFormat) => window.moment.tz(date, 'America/New_York').tz(timeZone).format(dateFormat);

export const highlightMatches = (text, keywords) => {
  if (!keywords.length) return text;

  const escapedKeywords = keywords.map((kw) => kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => (regex.test(part) ? (
    // eslint-disable-next-line react/no-array-index-key
    <span key={index} style={{ color: 'var(--jfv-gray-300)' }}>
      {part}
    </span>
  ) : (
    part
  )));
};

export const toCamelCase = (str = '') => String(str)
  .toLowerCase()
  .replace(/[_\-\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
  .replace(/^[A-Z]/, (match) => match.toLowerCase());

export const getPath = (url) => {
  try {
    return new URL(url).pathname;
  } catch (error) {
    return url;
  }
};

export const valueWithSlash = val => {
  if (!val || typeof val !== 'string') return val;
  if (val.startsWith('/')) return val;
  return `/${val}`;
};

export const getGreetingMessege = (language, currentMessage) => {
  const isDefault = currentMessage === GREETING_MESSAGE.en;
  return isDefault && GREETING_MESSAGE[language] ? { [CUSTOMIZATION_KEYS.GREETING_MESSAGE]: GREETING_MESSAGE[language] } : {};
};

export const prepareAvatarPayload = (avatar = {}) => ({
  properties: [
    {
      prop: 'avatarIconLink',
      type: 'avatar',
      value: avatar.avatarIconLink
    },
    {
      prop: 'gender',
      type: 'avatar',
      value: avatar.avatarType
    },
    {
      prop: 'avatarLink',
      type: 'avatar',
      value: avatar.avatarLink
    },
    {
      prop: 'avatarPrompt',
      type: 'avatar',
      value: avatar.prompt
    },
    {
      prop: 'avatarGenerationMethod',
      type: 'avatar',
      value: 'avatars'
    }
  ]
});

export const swapItem = (arr, id) => {
  const index = arr.findIndex(item => item.id === id);
  if (index <= 0) return arr;

  const [targetItem] = arr.splice(index, 1);
  const firstItem = arr.shift();
  arr.splice(index - 1, 0, firstItem);
  arr.unshift(targetItem);

  return arr;
};

export const getAvatarIdFromUrl = avatarUrl => Number(avatarUrl?.split?.('_')?.[2]?.split?.('.')?.[0]) || 0;

export const normalizeAvatarProps = avatarArr => (
  avatarArr?.map(({
    prompt,
    avatar_icon_link: avatarIconLink,
    avatar_link: avatarLink,
    avatar_type: avatarType,
    avatar_name: avatarName = '',
    default_voice_ids: defaultVoiceIDs,
    detailed_prompt: detailedPrompt,
    ...props
  }) => ({
    prompt,
    avatarName,
    avatarType,
    avatarLink,
    avatarIconLink,
    defaultVoiceIDs,
    detailedPrompt,
    ...props
  })) || []
);

export const isValidJotformUrl = url => /^https?:\/\/(cdn\.jotfor\.ms|(?:[a-z0-9-]+\.)?jotform\.com)/.test(url);

export const getThemeColor = (theme, property) => {
  const colorProp = theme.properties.find(({ prop }) => prop === property);
  return colorProp?.value || '';
};
