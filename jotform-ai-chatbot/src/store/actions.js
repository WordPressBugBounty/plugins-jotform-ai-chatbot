export const generatePromiseActionType = baseName => ({
  REQUEST: `${baseName}/REQUEST`,
  SUCCESS: `${baseName}/SUCCESS`,
  ERROR: `${baseName}/ERROR`
});

export const SET_USER = 'SET_USER';
export const SET_STEP = 'SET_STEP';
export const SET_PROMPT = 'SET_PROMPT';
export const TERMS_ACCEPTED = 'TERMS_ACCEPTED';
export const SET_IS_PUBLISHED = 'SET_IS_PUBLISHED';

export const FETCH_USER = generatePromiseActionType('FETCH_USER');
export const UPDATE_USER_SETTINGS = generatePromiseActionType('UPDATE_USER_SETTINGS');
export const CHECK_AI_CHATBOT_LIMITS = generatePromiseActionType('CHECK_AI_CHATBOT_LIMITS');

export const GET_ALL_AGENTS = generatePromiseActionType('GET_ALL_AGENTS');

export const FETCH_CHATS = generatePromiseActionType('FETCH_CHATS');
export const FETCH_CONVERSATIONS = generatePromiseActionType('FETCH_CONVERSATIONS');
export const SET_FETCH_CONVERSATIONS_LOADING = 'SET_FETCH_CONVERSATIONS_LOADING';

export const UPDATE_AGENT = generatePromiseActionType('UPDATE_AGENT');
export const UPDATE_AGENT_PROPERTY = generatePromiseActionType('UPDATE_AGENT_PROPERTY');

export const UPDATE_CUSTOMIZATION = 'UPDATE_CUSTOMIZATION';
export const UPDATE_CUSTOMIZATION_ASYNC = generatePromiseActionType('UPDATE_CUSTOMIZATION_ASYNC');

export const UPDATE_THEME = generatePromiseActionType('UPDATE_THEME');
export const UPDATE_THEME_PROPERTY = generatePromiseActionType('UPDATE_THEME_PROPERTY');

export const FETCH_MATERIALS = generatePromiseActionType('FETCH_MATERIALS');
export const ADD_MATERIAL = generatePromiseActionType('ADD_MATERIAL');
export const UPDATE_MATERIAL = generatePromiseActionType('UPDATE_MATERIAL');
export const DELETE_MATERIAL = generatePromiseActionType('DELETE_MATERIAL');
export const BULK_DELETE_MATERIAL = generatePromiseActionType('BULK_DELETE_MATERIAL');

// platform actions
export const PUBLISH_AGENT = generatePromiseActionType('PUBLISH_AGENT');
export const USE_PLATFORM_AGENT = generatePromiseActionType('USE_PLATFORM_AGENT');
export const GET_PLATFORM_AGENT = generatePromiseActionType('GET_PLATFORM_AGENT');
export const DELETE_PLATFORM_AGENT = generatePromiseActionType('DELETE_PLATFORM_AGENT');
export const GET_PLATFORM_SETTINGS = generatePromiseActionType('GET_PLATFORM_SETTINGS');
export const SAVE_PROVIDER_API_KEY = generatePromiseActionType('SAVE_PROVIDER_API_KEY');
export const SAVE_PLATFORM_AGENT_PAGES = generatePromiseActionType('SAVE_PLATFORM_AGENT_PAGES');

export const GET_AVATARS = generatePromiseActionType('GET_AVATARS');

export const SET_AVATARS = 'SET_AVATARS';
export const SET_PERSONA = 'SET_PERSONA';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const RESET_AVATARS = 'RESET_AVATARS';
export const SET_AGENT_NAME = 'SET_AGENT_NAME';
export const SET_AGENT_ROLE = 'SET_AGENT_ROLE';
export const SET_TONE_OF_VOICE = 'SET_TONE_OF_VOICE';
export const SET_VISIBLE_DEVICE = 'SET_VISIBLE_DEVICE';
export const SET_AGENT_CHATTINESS = 'SET_AGENT_CHATTINESS';
export const SET_LIMIT_DIALOG_VISIBLE = 'SET_LIMIT_DIALOG_VISIBLE';

export const SET_SELECTED_PAGES = 'SET_SELECTED_PAGES';
export const SET_INITAL_LOADING = 'SET_INITAL_LOADING';
export const SET_PROVIDER_API_KEY = 'SET_PROVIDER_API_KEY';
export const SET_PLATFORM_SETTINGS = 'SET_PLATFORM_SETTINGS';
export const SET_GET_PLATFORM_AGENT_ONCE = 'SET_GET_PLATFORM_AGENT_ONCE';
