/* eslint-disable complexity */
import { reinitializeRequestLayer, saveInstallment } from '../api';
import {
  CUSTOMIZATION_KEYS, EU_PROVIDER_API_URL, EU_PROVIDER_URL, GREETING_MESSAGE, POSITION, STEPS, THEME_CUSTOMIZATION_KEYS,
  VERBAL_TOGGLE
} from '../constants';
import {
  getAvatarIdFromUrl,
  getGreetingMessege,
  isValidJotformUrl,
  normalizeAvatarProps,
  platformSettings as platformSettingsSingleton,
  removeObjectKey, resetPlatformPages
} from '../utils';
import {
  ADD_MATERIAL,
  BULK_DELETE_MATERIAL, CHECK_AI_CHATBOT_LIMITS, DELETE_MATERIAL, DELETE_PLATFORM_AGENT,
  FETCH_USER, GET_ALL_AGENTS, GET_AVATARS, GET_PLATFORM_AGENT, GET_PLATFORM_SETTINGS,
  NEXT_STEP, PREVIOUS_STEP, RESET_AVATARS, SAVE_PLATFORM_AGENT_EMBED, SAVE_PLATFORM_AGENT_PAGES,
  SAVE_PROVIDER_API_KEY, SELECT_AGENT, SET_AGENT_CHATTINESS,
  SET_AGENT_NAME, SET_AGENT_ROLE, SET_AVATARS, SET_GET_PLATFORM_AGENT_ONCE, SET_LANGUAGE, SET_LIMIT_DIALOG_VISIBLE, SET_PAGE_SAVE_DISABLED,
  SET_PLATFORM_SETTINGS, SET_PROMPT, SET_PROVIDER_API_KEY, SET_SELECTED_PLATFORM_PAGES,
  SET_STEP, SET_TONE_OF_VOICE, SET_USER, SET_WP_PAGE_SELECTION_SEEN, TERMS_ACCEPTED, UPDATE_CUSTOMIZATION,
  UPDATE_MATERIAL, UPDATE_THEME, UPDATE_THEME_PROPERTY, USE_AGENT, USE_PLATFORM_AGENT
} from './actions';

const defaultSelectedAvatar = {
  id: 0, avatarName: '', avatarIconLink: '', avatarLink: '', avatarType: '', propmt: ''
};

export const initialState = {
  user: null,
  termsChecked: false,
  step: STEPS.INITIAL,
  selectedTemplateAgentId: null,
  agentName: '',
  agentRole: '',
  agentChattiness: '1',
  agentLanguage: 'en',
  agentToneOfVoice: '',
  selectedAvatar: defaultSelectedAvatar,
  previewAgentId: null,
  themeName: null,
  materials: [],
  errorMessage: '',
  isUseAgentLoading: false,
  isInitialLoading: true,
  isWpPageSelectionSeen: false,
  allAgents: {
    loading: false,
    items: []
  },
  avatars: [],
  avatarsOffset: 1,
  areAvatarsLoading: false,
  allAvatarsFetched: false,
  customizations: {
    [CUSTOMIZATION_KEYS.GREETING]: VERBAL_TOGGLE.YES,
    [CUSTOMIZATION_KEYS.GREETING_MESSAGE]: GREETING_MESSAGE.en,
    [CUSTOMIZATION_KEYS.PULSE]: VERBAL_TOGGLE.YES,
    [CUSTOMIZATION_KEYS.POSITION]: POSITION.RIGHT
  },
  themeCustomizations: {
    [THEME_CUSTOMIZATION_KEYS.AGENT_BG_START_COLOR]: '',
    [THEME_CUSTOMIZATION_KEYS.AGENT_BG_END_COLOR]: '',
    [THEME_CUSTOMIZATION_KEYS.CHAT_BG_COLOR]: '',
    [THEME_CUSTOMIZATION_KEYS.FONT_FAMILY]: '',
    [THEME_CUSTOMIZATION_KEYS.FONT_COLOR]: '',
    [THEME_CUSTOMIZATION_KEYS.BUTTON_BG_COLOR]: '',
    [THEME_CUSTOMIZATION_KEYS.BUTTON_ICON_BG_COLOR]: ''
  },
  // platform agent
  prompt: '',
  isSavePlatformAgentEmbedLoading: false,
  isDeletePlatformAgentLoading: false,
  isSavePlatformAgentPagesLoading: false,
  isPlatformSettingsLoading: false,
  isInitialPlatformSettingsReady: false,
  isPageSaveDisabled: true,
  tryGetPlatformAgentOnce: false,
  selectedPlatformPages: ['all'],
  platformSettings: { ...platformSettingsSingleton },
  refetchUser: false
};

export const wizardReducer = (state, action) => {
  switch (action.type) {
    // next step
    case NEXT_STEP:
      if (state.step === STEPS.INITIAL) return { ...state, step: STEPS.USECASE_SELECTION };
      if (state.step === STEPS.USECASE_SELECTION) return { ...state, step: STEPS.CUSTOMIZATION };
      if (state.step === STEPS.CUSTOMIZATION) return { ...state, step: STEPS.AVATAR };
      if (state.step === STEPS.AVATAR) return { ...state, step: STEPS.AI_PERSONA };
      if (state.step === STEPS.AI_PERSONA) return { ...state, step: STEPS.STYLE };
      if (state.step === STEPS.STYLE) return { ...state, step: STEPS.KNOWLEDGE };
      if (state.step === STEPS.KNOWLEDGE) return { ...state, step: STEPS.WP_PAGE_SELECTION };
      return state;
    // previous step
    case PREVIOUS_STEP:
      if (state.step === STEPS.WP_PAGE_SELECTION) return { ...state, step: STEPS.KNOWLEDGE };
      if (state.step === STEPS.KNOWLEDGE) return { ...state, step: STEPS.STYLE };
      if (state.step === STEPS.STYLE) return { ...state, step: STEPS.AI_PERSONA };
      if (state.step === STEPS.AI_PERSONA) return { ...state, step: STEPS.AVATAR };
      if (state.step === STEPS.AVATAR) return { ...state, step: STEPS.CUSTOMIZATION };
      if (state.step === STEPS.CUSTOMIZATION) return { ...state, step: STEPS.USECASE_SELECTION };
      if (state.step === STEPS.USECASE_SELECTION) return { ...state, step: STEPS.INITIAL, selectedTemplateAgentId: null };
      return state;
    case SET_STEP:
      return { ...state, step: action.payload.step };
    // fetch user
    case FETCH_USER.REQUEST:
      return {
        ...state,
        isInitialLoading: true
      };
    case FETCH_USER.SUCCESS:
      const user = action.payload.result;
      return {
        ...state,
        user
      };
    case FETCH_USER.ERROR:
      let errorState = {};
      const errorData = action.payload.result?.data;
      if (errorData.responseCode === 301 && errorData.location?.includes('eu-api')) {
        platformSettingsSingleton.PROVIDER_URL = EU_PROVIDER_URL;
        platformSettingsSingleton.PROVIDER_API_URL = EU_PROVIDER_API_URL;
        reinitializeRequestLayer();
        errorState = {
          refetchUser: true,
          platformSettings: {
            ...state.platformSettings,
            PROVIDER_API_URL: EU_PROVIDER_API_URL,
            PROVIDER_URL: EU_PROVIDER_URL
          }
        };
      }
      return {
        ...state,
        step: STEPS.INITIAL,
        isInitialLoading: false,
        ...errorState
      };
    // select agent
    case SELECT_AGENT:
      return { ...state, selectedTemplateAgentId: action.payload.selectedTemplateAgentId };
    // use agent
    case USE_AGENT.REQUEST:
    case USE_PLATFORM_AGENT.REQUEST:
    case GET_PLATFORM_AGENT.REQUEST:
      return { ...state, isUseAgentLoading: true };
    case USE_AGENT.SUCCESS:
    case USE_PLATFORM_AGENT.SUCCESS:
    case GET_PLATFORM_AGENT.SUCCESS:
      const {
        result: {
          content = undefined, agentID = '', agentProperties = {}, agentMaterials = [], agentName, chatbotEmbedSrc
        },
        step
      } = action.payload;
      platformSettingsSingleton.PROVIDER_CHATBOT_EMBED_SRC = chatbotEmbedSrc;
      if (content === false) {
        return {
          ...state,
          step: STEPS.USECASE_SELECTION,
          isUseAgentLoading: false,
          isInitialLoading: false
        };
      }
      const currentAvatar = {
        avatarName: agentName,
        avatarType: agentProperties.gender,
        avatarLink: agentProperties.avatarLink,
        prompt: agentProperties.avatarPrompt,
        avatarIconLink: agentProperties.avatarIconLink,
        id: getAvatarIdFromUrl(agentProperties.avatarIconLink)
      };
      return {
        ...state,
        step: step || STEPS.CUSTOMIZATION,
        previewAgentId: agentID,
        agentName,
        agentRole: agentProperties.role,
        agentChattiness: agentProperties.chattiness,
        agentLanguage: agentProperties.language,
        selectedAvatar: { ...currentAvatar },
        agentToneOfVoice: agentProperties.tone,
        themeCustomizations: removeObjectKey(agentProperties, 'popover'),
        isLimitDialogVisible: false,
        customizations: {
          ...state.customizations,
          ...agentProperties.popover,
          ...getGreetingMessege(agentProperties.language, agentProperties.popover?.greetingMessage)
        },
        avatars: [{ ...currentAvatar }, ...state.avatars.filter(avt => avt.id !== state.selectedAvatar.id)],
        materials: agentMaterials,
        isUseAgentLoading: false,
        isInitialLoading: false
      };
    case USE_AGENT.ERROR:
    case USE_PLATFORM_AGENT.ERROR:
    case GET_PLATFORM_AGENT.ERROR:
      const { tryOnce = false } = action.payload;
      return {
        ...state,
        errorMessage: action.payload.result?.message,
        isUseAgentLoading: false,
        tryGetPlatformAgentOnce: tryOnce
      };
    case UPDATE_CUSTOMIZATION:
      return { ...state, customizations: { ...state.customizations, [action.payload.key]: action.payload.value } };
    case TERMS_ACCEPTED:
      return { ...state, termsChecked: action.payload };
    case UPDATE_THEME.SUCCESS:
      const newCustomizations = action.payload.result.reduce((currentCust, { props: { prop, value } = {} }) => {
        if (!prop) return currentCust;
        if (['activeTheme', 'inputBackground', 'pageBackgroundEnd', 'pageBackgroundStart'].includes(prop)) return currentCust;
        return { ...currentCust, [prop]: value };
      }, {});
      return {
        ...state,
        themeName: action.payload.themeName,
        themeCustomizations: { ...state.themeCustomizations, ...newCustomizations }
      };
    case UPDATE_THEME_PROPERTY.SUCCESS:
      return { ...state, themeCustomizations: { ...state.themeCustomizations, [action.payload.result.props?.prop]: action.payload.result.props?.value } };
    case ADD_MATERIAL.SUCCESS:
      return { ...state, materials: [...state.materials, { ...action.payload.result, status: 'PROCESSED' }] }; // socket connection is required to get the real status
    case UPDATE_MATERIAL.SUCCESS:
      const updatedMaterial = action.payload.result;
      const updatedMaterials = state.materials.map(material => {
        if (material.uuid === updatedMaterial.uuid) return { ...material, ...updatedMaterial };
        return material;
      });
      return { ...state, materials: updatedMaterials };
    case DELETE_MATERIAL.SUCCESS:
      if (!action.payload.result) return state;
      const withoutDeletedMaterials = state.materials.filter(material => material.uuid !== action.payload.materialId);
      return { ...state, materials: withoutDeletedMaterials };
    case BULK_DELETE_MATERIAL.SUCCESS:
      if (!action.payload.result) return state;
      const withoutBulkDeletedMaterials = state.materials.filter(material => !action.payload.materialIds.includes(material.uuid));
      return { ...state, materials: withoutBulkDeletedMaterials };
    // check ai chatbot limits
    case CHECK_AI_CHATBOT_LIMITS.REQUEST: {
      return { ...state, isUseAgentLoading: true };
    }
    case CHECK_AI_CHATBOT_LIMITS.SUCCESS: {
      if (typeof action.payload.result === 'boolean' && action.payload.result === true) {
        return {
          ...state,
          isUseAgentLoading: false,
          isLimitDialogVisible: true
        };
      }
      return { ...state };
    }
    case CHECK_AI_CHATBOT_LIMITS.ERROR: {
      console.error('chatbot limits fetch error', action.payload);
      return { ...state, isUseAgentLoading: false };
    }
    case SET_PROMPT: {
      return { ...state, prompt: action.payload.prompt };
    }
    case SET_USER: {
      return { ...state, user: action.payload.user };
    }
    // get platform settings
    case GET_PLATFORM_SETTINGS.REQUEST: {
      return { ...state, isPlatformSettingsLoading: true };
    }
    case GET_PLATFORM_SETTINGS.SUCCESS: {
      const data = action.payload.result?.data;
      platformSettingsSingleton.PROVIDER_API_KEY = data.PROVIDER_API_KEY;
      platformSettingsSingleton.PROVIDER_API_URL = data.PROVIDER_API_URL;
      platformSettingsSingleton.PROVIDER_URL = data.PROVIDER_URL;
      platformSettingsSingleton.PLATFORM = data.PLATFORM;
      platformSettingsSingleton.PLATFORM_DOMAIN = data.PLATFORM_DOMAIN;
      platformSettingsSingleton.PLATFORM_PAGES = data.PLATFORM_PAGES;
      platformSettingsSingleton.PLATFORM_PAGE_CONTENTS = data.PLATFORM_PAGE_CONTENTS;
      platformSettingsSingleton.PLATFORM_PREVIEW_URL = data.PLATFORM_PREVIEW_URL;
      platformSettingsSingleton.PLATFORM_KNOWLEDGE_BASE = data.PLATFORM_KNOWLEDGE_BASE;
      reinitializeRequestLayer();
      saveInstallment();
      return {
        ...state,
        platformSettings: { ...state.platformSettings, ...data },
        isPlatformSettingsLoading: false
      };
    }
    case GET_PLATFORM_SETTINGS.ERROR: {
      return { ...state, platformSettings: { ...action.payload.result?.message }, isPlatformSettingsLoading: false };
    }
    case SET_PLATFORM_SETTINGS: {
      return { ...state, platformSettings: action.payload.platformSettings, isInitialPlatformSettingsReady: true };
    }
    // save platform agent embed
    case SAVE_PLATFORM_AGENT_EMBED.REQUEST:
      return { ...state, isSavePlatformAgentEmbedLoading: true };
    case SAVE_PLATFORM_AGENT_EMBED.SUCCESS:
      return { ...state, isSavePlatformAgentEmbedLoading: false };
    case SAVE_PLATFORM_AGENT_EMBED.ERROR:
      return { ...state, isSavePlatformAgentEmbedLoading: false, errorMessage: action.payload.result?.message };
    // save platform agent pages
    case SAVE_PLATFORM_AGENT_PAGES.REQUEST:
      return { ...state, isSavePlatformAgentPagesLoading: true };
    case SAVE_PLATFORM_AGENT_PAGES.SUCCESS:
      return { ...state, isSavePlatformAgentPagesLoading: false, isPageSaveDisabled: true };
    case SAVE_PLATFORM_AGENT_PAGES.ERROR:
      return { ...state, isSavePlatformAgentPagesLoading: false, errorMessage: action.payload.result?.message };
    // delete platform agent
    case DELETE_PLATFORM_AGENT.REQUEST:
      return {
        ...state,
        isDeletePlatformAgentLoading: true
      };
    case DELETE_PLATFORM_AGENT.SUCCESS:
      const resetedPages = resetPlatformPages(state.platformSettings.PLATFORM_PAGES);
      platformSettingsSingleton.PLATFORM_PAGES = resetedPages;
      return {
        ...state,
        step: STEPS.USECASE_SELECTION,
        previewAgentId: null,
        themeCustomizations: { ...initialState.themeCustomizations },
        customizations: { ...initialState.customizations },
        materials: [],
        isDeletePlatformAgentLoading: false,
        prompt: '',
        platformSettings: {
          ...state.platformSettings,
          PLATFORM_PAGES: resetedPages
        }
      };
    case DELETE_PLATFORM_AGENT.ERROR:
      return { ...state, isDeletePlatformAgentLoading: false };
    // save provider api key
    case SAVE_PROVIDER_API_KEY.REQUEST:
      return state;
    case SAVE_PROVIDER_API_KEY.SUCCESS:
      return state;
    case SAVE_PROVIDER_API_KEY.ERROR:
      return { ...state, errorMessage: action.payload.result?.message };
    case SET_PAGE_SAVE_DISABLED:
      return {
        ...state,
        isPageSaveDisabled: action.payload.isDisabled
      };
    case SET_SELECTED_PLATFORM_PAGES:
      return {
        ...state,
        selectedPlatformPages: action.payload.selectedPages
      };
    case SET_PROVIDER_API_KEY:
      return {
        ...state,
        platformSettings: { ...state.platformSettings, PROVIDER_API_KEY: action.payload.apiKey }
      };
    case SET_GET_PLATFORM_AGENT_ONCE:
      return {
        ...state,
        tryGetPlatformAgentOnce: action.payload.tryOnce
      };
    case SET_AGENT_NAME:
      return {
        ...state,
        agentName: action.payload.agentName
      };
    case SET_AGENT_ROLE:
      return {
        ...state,
        agentRole: action.payload.agentRole
      };
    case SET_AGENT_CHATTINESS:
      return {
        ...state,
        agentChattiness: action.payload.agentChattiness
      };
    case GET_AVATARS.REQUEST:
      return {
        ...state,
        areAvatarsLoading: true
      };
    case GET_AVATARS.SUCCESS:
      const fetchedAvatars = normalizeAvatarProps(action.payload.result?.avatars);
      const avatarsWithoutSelected = fetchedAvatars.filter(avatar => getAvatarIdFromUrl(avatar.avatarIconLink) !== getAvatarIdFromUrl(state.selectedAvatar.avatarIconLink));
      const validatedAvatars = avatarsWithoutSelected.filter(avtr => isValidJotformUrl(avtr.avatarIconLink) && avtr.avatarName !== 'Avatar test');
      return {
        ...state,
        areAvatarsLoading: false,
        avatars: [...state.avatars, ...validatedAvatars],
        avatarsOffset: action.payload.result?.nextPageOffset,
        allAvatarsFetched: action.payload.result?.avatars?.length === 0
      };
    case GET_AVATARS.ERROR:
      return {
        ...state,
        areAvatarsLoading: false,
        errorMessage: action.payload.result?.message
      };
    case SET_AVATARS:
      return {
        ...state,
        avatars: [...action.payload.avatars],
        selectedAvatar: action.payload.selectedAvatar
      };
    case SET_LANGUAGE:
      return {
        ...state,
        agentLanguage: action.payload.language
      };
    case SET_TONE_OF_VOICE:
      return {
        ...state,
        agentToneOfVoice: action.payload.toneOfVoice
      };
    case SET_WP_PAGE_SELECTION_SEEN:
      return {
        ...state,
        isWpPageSelectionSeen: true
      };
    case GET_ALL_AGENTS.REQUEST:
      return {
        ...state,
        allAgents: {
          loading: true,
          items: []
        }
      };
    case GET_ALL_AGENTS.SUCCESS:
    case GET_ALL_AGENTS.ERROR:
      return {
        ...state,
        allAgents: {
          loading: false,
          items: action?.payload?.agents || []
        }
      };
    case RESET_AVATARS:
      return {
        ...state,
        avatars: [],
        selectedAvatar: defaultSelectedAvatar,
        avatarsOffset: 1
      };
    case SET_LIMIT_DIALOG_VISIBLE:
      return {
        ...state,
        isLimitDialogVisible: action.payload.isLimitDialogVisible
      };
    default:
      return state;
  }
};
