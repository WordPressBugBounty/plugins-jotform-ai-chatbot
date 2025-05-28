export const generatePromiseActionType = baseName => ({
  REQUEST: `${baseName}/REQUEST`,
  SUCCESS: `${baseName}/SUCCESS`,
  ERROR: `${baseName}/ERROR`
});

export const SET_STEP = 'SET_STEP';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';

export const SET_USER = 'SET_USER';
export const SET_PROMPT = 'SET_PROMPT';
export const TERMS_ACCEPTED = 'TERMS_ACCEPTED';

export const FETCH_USER = generatePromiseActionType('FETCH_USER');
export const UPDATE_USER_SETTINGS = generatePromiseActionType('UPDATE_USER_SETTINGS');
export const CHECK_AI_CHATBOT_LIMITS = generatePromiseActionType('CHECK_AI_CHATBOT_LIMITS');

export const SELECT_AGENT = 'SELECT_AGENT';
export const USE_AGENT = generatePromiseActionType('USE_AGENT');
export const GET_ALL_AGENTS = generatePromiseActionType('GET_ALL_AGENTS');

export const UPDATE_AGENT = generatePromiseActionType('UPDATE_AGENT');
export const UPDATE_AGENT_PROPERTY = generatePromiseActionType('UPDATE_AGENT_PROPERTY');

export const UPDATE_CUSTOMIZATION = 'UPDATE_CUSTOMIZATION';
export const UPDATE_CUSTOMIZATION_ASYNC = generatePromiseActionType('UPDATE_CUSTOMIZATION_ASYNC');

export const UPDATE_THEME = generatePromiseActionType('UPDATE_THEME');
export const UPDATE_THEME_PROPERTY = generatePromiseActionType('UPDATE_THEME_PROPERTY');

export const ADD_MATERIAL = generatePromiseActionType('ADD_MATERIAL');
export const UPDATE_MATERIAL = generatePromiseActionType('UPDATE_MATERIAL');
export const DELETE_MATERIAL = generatePromiseActionType('DELETE_MATERIAL');
export const BULK_DELETE_MATERIAL = generatePromiseActionType('BULK_DELETE_MATERIAL');

// platform actions
export const USE_PLATFORM_AGENT = generatePromiseActionType('USE_PLATFORM_AGENT');
export const GET_PLATFORM_AGENT = generatePromiseActionType('GET_PLATFORM_AGENT');
export const DELETE_PLATFORM_AGENT = generatePromiseActionType('DELETE_PLATFORM_AGENT');
export const GET_PLATFORM_SETTINGS = generatePromiseActionType('GET_PLATFORM_SETTINGS');
export const SAVE_PROVIDER_API_KEY = generatePromiseActionType('SAVE_PROVIDER_API_KEY');
export const SAVE_PLATFORM_AGENT_EMBED = generatePromiseActionType('SAVE_PLATFORM_AGENT_EMBED');
export const SAVE_PLATFORM_AGENT_PAGES = generatePromiseActionType('SAVE_PLATFORM_AGENT_PAGES');

export const GET_AVATARS = generatePromiseActionType('GET_AVATARS');

export const SET_AVATARS = 'SET_AVATARS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_AGENT_NAME = 'SET_AGENT_NAME';
export const SET_AGENT_ROLE = 'SET_AGENT_ROLE';
export const SET_TONE_OF_VOICE = 'SET_TONE_OF_VOICE';
export const SET_AGENT_CHATTINESS = 'SET_AGENT_CHATTINESS';
export const RESET_AVATARS = 'RESET_AVATARS';
export const SET_LIMIT_DIALOG_VISIBLE = 'SET_LIMIT_DIALOG_VISIBLE';

export const SET_INITAL_LOADING = 'SET_INITAL_LOADING';
export const SET_PROVIDER_API_KEY = 'SET_PROVIDER_API_KEY';
export const SET_PLATFORM_SETTINGS = 'SET_PLATFORM_SETTINGS';
export const SET_PAGE_SAVE_DISABLED = 'SET_PAGE_SAVE_DISABLED';
export const SET_WP_PAGE_SELECTION_SEEN = 'SET_WP_PAGE_SELECTION_SEEN';
export const SET_SELECTED_PLATFORM_PAGES = 'SET_SELECTED_PLATFORM_PAGES';
export const SET_GET_PLATFORM_AGENT_ONCE = 'SET_GET_PLATFORM_AGENT_ONCE';
