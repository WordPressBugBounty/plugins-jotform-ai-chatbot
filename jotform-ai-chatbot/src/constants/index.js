/* eslint-disable max-len */
import avatar5 from '../assets/images/avatars/avatar_icon_40.png';
import avatar1 from '../assets/images/avatars/avatar_icon_139.png';
import avatar9 from '../assets/images/avatars/avatar_icon_404.png';
import avatar7 from '../assets/images/avatars/avatar_icon_461.png';
import avatar8 from '../assets/images/avatars/avatar_icon_619.png';
import avatar2 from '../assets/images/avatars/avatar_icon_817.png';
import avatar3 from '../assets/images/avatars/avatar_icon_819.png';
import avatar6 from '../assets/images/avatars/avatar_icon_1065.png';
import avatar4 from '../assets/images/avatars/avatar_icon_1584.png';
import { IconAnnotationInfoFilled, IconLinkDiagonal } from '../components/UI/Icon';
import { ALL_TEXTS } from './texts.js';

export * from './themes';
export * from './texts';
export * from './languages';

export const STEPS = {
  INITIAL: 'INITIAL',
  USECASE_SELECTION: 'USECASE_SELECTION',
  CUSTOMIZATION: 'CUSTOMIZATION',
  DESCRIBE: 'DESCRIBE',
  STYLE: 'STYLE',
  SHARE: 'SHARE',
  KNOWLEDGE: 'KNOWLEDGE',
  WP_PAGE_SELECTION: 'WP_PAGE_SELECTION',
  AVATAR: 'AVATAR',
  AI_PERSONA: 'AI_PERSONA'
};

export const USE_CASES = [
  { templateId: '0192fce444977bbe9678bb4dca721a5fad06', templateAgentId: '0192FCE3FB657D9DA679016CD685B22DAFF6', label: ALL_TEXTS.DELETE_EXISTING_AGENT },
  { templateId: '0192fc8a468b7c399286fa7055574c6ba04b', templateAgentId: '0192FC89E8427B4BBE10928C4577D5B0889F', label: ALL_TEXTS.CUSTOMER_SUPPORT_AI_AGENT },
  { templateId: '0192fcce8d1b7ea7b13079026bd5cd316868', templateAgentId: '0192FCCE10957E4DB9C895E813ADD6C78CD3', label: ALL_TEXTS.LEAD_GENERATION_AI_AGENT },
  { templateId: '0192fc77e2307fa9be2aec42d8cc4c45089f', templateAgentId: '0192FC778268753B9B183A11173C683AB8E2', label: ALL_TEXTS.APPOINTMENT_SCHEDULING_AI_AGENT },
  { templateId: '0192fc008a0b738d9797e4cfebd3fbdd7724', templateAgentId: '0192FC0043497C49A854562BD0946BC27C64', label: ALL_TEXTS.ONLINE_EVENT_REGISTRATION_AI_AGENT },
  { templateId: '0193010e5626721ca89a74c793ebdab333f9', templateAgentId: '0193010DCC857EFDB8B2551F3CFB86190829', label: ALL_TEXTS.FEEDBACK_AI_AGENT }
];

export const VERBAL_TOGGLE = {
  YES: 'Yes',
  NO: 'No'
};

export const POSITION = {
  RIGHT: 'right',
  LEFT: 'left'
};

export const CUSTOMIZATION_KEYS = {
  GREETING: 'greeting',
  GREETING_MESSAGE: 'greetingMessage',
  PULSE: 'pulse',
  POSITION: 'position'
};

export const THEME_CUSTOMIZATION_KEYS = {
  AGENT_BG_START_COLOR: 'agentBackgroundStart',
  AGENT_BG_END_COLOR: 'agentBackgroundEnd',
  CHAT_BG_COLOR: 'chatBackground',
  FONT_FAMILY: 'fontFamily',
  FONT_COLOR: 'inputTextColor',
  BUTTON_BG_COLOR: 'sendButtonBackground',
  BUTTON_ICON_BG_COLOR: 'sendButtonIconColor'
};

export const FONTS = [
  { value: 'inter, sans-serif', label: 'Inter' },
  { value: 'Circular', label: 'Circular' },
  { value: '"Times New Roman"', label: 'Times New Roman' }
];

export const PROMPTS = [{
  id: 1,
  buttonText: 'Registration',
  text: 'Create a course registration agent suitable for any school or institution. The agent should be capable of collecting information for registration processes while being adaptable to various course structures, schedules, and user demographics (students, teachers, administrators).'
}, {
  id: 2,
  buttonText: 'Job Application',
  text: 'Develop a basic job application agent that serves as a one-page solution for collecting essential information from applicants. This agent should encompass personal details, educational background, and reference information. You can use your imagination to generate more fields related to the topic.'
}, {
  id: 3,
  buttonText: 'Feedback',
  text: 'Create a client feedback agent to gather valuable insights from my clients. The agent should be adaptable to all stages of feedback collection, from engaging with clients in a user-friendly way to gathering data.'
}, {
  id: 4,
  buttonText: 'Appointment',
  text: 'Develop an appointment request agent tailored for medical practices. This agent should collect information needed to schedule health appointments, such as a patient\'s name, address, and contact details.'
}];

export const PLATFORMS = { WORDPRESS: 'wordpress' };

export const CHATTINESS_LEVELS = [
  {
    title: 'Minimalist',
    desc: '1 sentence'
  },
  {
    title: 'Standard',
    desc: '2-3 sentences'
  },
  {
    title: 'Chatty',
    desc: '7+ sentences'
  }
];

export const TONE_OF_VOICES = [
  {
    value: 'casual',
    text: 'Casual',
    emoji: '☕'
  },
  {
    value: 'professional',
    text: 'Professional',
    emoji: '👔'
  },
  {
    value: 'friendly',
    text: 'Friendly',
    emoji: '😊'
  }
];

export const AVATAR_URLS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

export const KEY_KEYCODE_LIST = {
  Enter: 13,
  Backspace: 8,
  Comma: 188,
  Tab: 9,
  Space: 32,
  Escape: 27
};

export const TRAIN_TYPES = {
  TEXT: {
    name: 'Knowledge',
    desc: 'Add information to train your AI.',
    icon: <IconAnnotationInfoFilled />,
    iconClassName: 'isKnowledge'
  },
  URL: {
    name: 'Link',
    desc: 'Add website URLs train your Agent with dynamic information.',
    icon: <IconLinkDiagonal />,
    isPublic: true,
    iconClassName: 'isLink'
  }
};

export const MATERIAL_STATUS = {
  TEXT: {
    IN_PROGRESS: '...',
    PROCESSED: 'Agent trained',
    FAILED: 'Failed',
    ACTION_REQUIRED: 'Added'
  },
  QA: {
    IN_PROGRESS: '...',
    PROCESSED: 'Agent trained',
    FAILED: 'Failed',
    ACTION_REQUIRED: 'Added'
  },
  URL: {
    IN_PROGRESS: '...',
    STEP1: 'Agent is navigating through the URL...',
    STEP2: 'Agent is gathering insights from the URL...',
    STEP3: 'Agent is extracting content from the source...',
    PROCESSED: 'Agent trained',
    FAILED: 'Failed',
    ACTION_REQUIRED: 'Added'
  },
  DOCUMENT: {
    IN_PROGRESS: '...',
    STEP1: 'Agent is reading your document for details...',
    STEP2: 'Agent is extracting key information from the document...',
    STEP3: 'Agent is preparing the document for deeper understanding..."',
    PROCESSED: 'Agent trained',
    FAILED: 'Failed',
    ACTION_REQUIRED: 'Added'
  }
};

export const URL_REGEX = /^(https?:\/\/)(localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/i;

export const JOTFORM_CSS_INLINE = {
  'text-xs': {
    fontSize: '0.75rem',
    lineHeight: '1rem'
  },
  'text-sm': {
    fontSize: '0.875rem',
    lineHeight: '1.125rem'
  },
  'text-md': {
    fontSize: '1rem',
    lineHeight: '1.25rem'
  }
};

export const GREETING_MESSAGE = {
  en: 'Hi! How can I assist you?',
  es: 'Hola, ¿cómo puedo ayudarle?',
  tr: 'Merhaba! Nasıl yardımcı olabilirim?',
  pt: 'Olá! Como posso ajudá-lo?',
  fr: 'Bonjour ! Comment puis-je vous aider ?',
  de: 'Hallo! Wie kann ich Ihnen helfen?',
  it: 'Ciao! Come posso aiutarti?',
  bg: 'Здравейте! Как мога да ви помогна?',
  sr: 'Zdravo! Kako mogu da vam pomognem?',
  hu: 'Szia! Hogyan segíthetek?',
  fi: 'Hei! Miten voin auttaa?',
  ka: 'გამარჯობა! როგორ შეიძლება დაგეხმაროთ?',
  nl: 'Hoi! Hoe kan ik je helpen?',
  id: 'Halo! Apa yang bisa saya bantu?',
  ko: '안녕하세요! 어떻게 도와드릴까요?',
  ar: 'مرحبًا! كيف يمكنني مساعدتك؟',
  ja: 'こんにちは！ どのようにお手伝いできますか？',
  pl: 'Cześć! Jak mogę ci pomóc?',
  ru: 'Привет! Чем я могу вам помочь?'
};

export const EU_PROVIDER_URL = 'https://eu.jotform.com';
export const EU_PROVIDER_API_URL = 'https://eu-api.jotform.com';

export const DELETE_INST_NAME = 'deleteWpChatbotButton';
