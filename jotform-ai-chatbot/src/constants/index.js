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
import {
  IconAnnotationInfoFilled, IconAnnotationQuestionFilled, IconArrowUpFromBracket, IconLinkDiagonal
} from '../components/UI/Icon';
import { ALL_TEXTS } from './texts.js';

export * from './themes';
export * from './texts';
export * from './languages';
export * from './pageSelection';

export const STEPS = {
  INITIAL: 'INITIAL',
  USECASE_SELECTION: 'USECASE_SELECTION',
  AI_PERSONA: 'AI_PERSONA',
  STYLE: 'STYLE',
  VISIBILITY: 'VISIBILITY',
  KNOWLEDGE: 'KNOWLEDGE',
  CONVERSATIONS: 'CONVERSATIONS'
};

export const STEP_TO_BUILDER_PATH = {
  [STEPS.AI_PERSONA]: '/train/persona',
  [STEPS.STYLE]: '',
  [STEPS.VISIBILITY]: '/publish/chatbot',
  [STEPS.KNOWLEDGE]: '/train'
};

export const TAB_STEPS = [
  {
    label: ALL_TEXTS.AI_PERSONA,
    name: STEPS.AI_PERSONA
  },
  {
    label: ALL_TEXTS.AGENT_STYLE,
    name: STEPS.STYLE
  },
  {
    label: ALL_TEXTS.VISIBILITY,
    name: STEPS.VISIBILITY
  },
  {
    label: ALL_TEXTS.KNOWLEDGE_BASE,
    name: STEPS.KNOWLEDGE
  }
];

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
  POSITION: 'position',
  AUTO_OPEN_CHAT: 'autoOpenChatIn',
  LAYOUT: 'layout'
};

export const AUTO_OPEN_CHAT_VALUES = {
  ALWAYS_OPEN: '1',
  FIVE_SECONDS: '5000',
  TEN_SECONDS: '10000',
  NEVER: '0'
};

export const OPEN_BY_DEFAULT_OPTIONS = [
  {
    text: ALL_TEXTS.ALWAYS_OPEN,
    value: AUTO_OPEN_CHAT_VALUES.ALWAYS_OPEN
  },
  {
    text: ALL_TEXTS.OPEN_AFTER_FIVE_SECONDS,
    value: AUTO_OPEN_CHAT_VALUES.FIVE_SECONDS
  },
  {
    text: ALL_TEXTS.OPEN_AFTER_TEN_SECONDS,
    value: AUTO_OPEN_CHAT_VALUES.TEN_SECONDS
  },
  {
    text: ALL_TEXTS.DO_NOT_OPEN_AUTOMATICALLY,
    value: AUTO_OPEN_CHAT_VALUES.NEVER
  }
];

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
    title: 'Minimal'
  },
  {
    title: 'Short'
  },
  {
    title: 'Long'
  },
  {
    title: 'Chatty'
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

export const DEVICES = [
  {
    value: 'all',
    text: 'All devices'
  },
  {
    value: 'mobile',
    text: 'Mobile'
  },
  {
    value: 'desktop',
    text: 'Desktop'
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
    name: 'Add Knowledge',
    desc: 'Add text-based information to train your chatbot.',
    icon: <IconAnnotationInfoFilled />,
    isPublic: true,
    iconClassName: 'isKnowledge'
  },
  DOCUMENT: {
    name: 'Upload Documents',
    desc: 'Upload files to train your chatbot.',
    icon: <IconArrowUpFromBracket />,
    isPublic: true,
    iconClassName: 'isDocument'
  },
  URL: {
    name: 'Crawl URL',
    desc: 'Add website URLs train your chatbot with dynamic information.',
    icon: <IconLinkDiagonal />,
    isPublic: true,
    iconClassName: 'isURL'
  },
  QA: {
    name: 'Questions & Answers',
    desc: 'Provide a question-and-answer pairing your chatbot can use in conversations.',
    icon: <IconAnnotationQuestionFilled />,
    isPublic: true,
    iconClassName: 'isQA'
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

export const WRITING_DEBOUNCE_TIMEOUT = 1750;
export const DELETE_INSTRUCTION_DEBOUNCE_TIMEOUT = 500;
export const GREETING_TEXT_REQ_DEBOUNCE_TIMEOUT = 500;

export const VISIBILITY_LAYOUT = {
  EXTENDED: {
    text: 'Extended',
    value: 'extended'
  },
  MINIMAL: {
    text: 'Minimal',
    value: 'minimal'
  }
};

export const WHATS_NEW_MODAL_LCST_FLAG = 'jaic_wnm_v3_0_0';
