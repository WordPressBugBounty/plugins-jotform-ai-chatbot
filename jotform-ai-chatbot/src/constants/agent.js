/**
 * Agent-related constants - personalities, training, and behavior
 */

import {
  IconAnnotationInfoFilled, IconAnnotationQuestionFilled, IconArrowUpFromBracket, IconLinkDiagonal
} from '../components/UI/Icon';
import { ALL_TEXTS } from './texts.js';

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

// Multilingual greeting messages
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

export const KEY_KEYCODE_LIST = {
  Enter: 13,
  Backspace: 8,
  Comma: 188,
  Tab: 9,
  Space: 32,
  Escape: 27
};
