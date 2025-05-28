import {
  ADD_MATERIAL, BULK_DELETE_MATERIAL, CHECK_AI_CHATBOT_LIMITS, DELETE_MATERIAL, DELETE_PLATFORM_AGENT, FETCH_USER,
  GET_ALL_AGENTS,
  GET_AVATARS,
  GET_PLATFORM_AGENT,
  GET_PLATFORM_SETTINGS,
  NEXT_STEP, PREVIOUS_STEP, RESET_AVATARS, SAVE_PLATFORM_AGENT_EMBED, SAVE_PLATFORM_AGENT_PAGES, SAVE_PROVIDER_API_KEY,
  SELECT_AGENT,
  SET_AGENT_CHATTINESS,
  SET_AGENT_NAME,
  SET_AGENT_ROLE,
  SET_AVATARS,
  SET_GET_PLATFORM_AGENT_ONCE,
  SET_INITAL_LOADING,
  SET_LANGUAGE,
  SET_LIMIT_DIALOG_VISIBLE,
  SET_PAGE_SAVE_DISABLED,
  SET_PLATFORM_SETTINGS,
  SET_PROMPT, SET_PROVIDER_API_KEY,
  SET_SELECTED_PLATFORM_PAGES, SET_STEP,
  SET_TONE_OF_VOICE,
  SET_USER, SET_WP_PAGE_SELECTION_SEEN, TERMS_ACCEPTED, UPDATE_AGENT,
  UPDATE_AGENT_PROPERTY,
  UPDATE_CUSTOMIZATION, UPDATE_CUSTOMIZATION_ASYNC,
  UPDATE_MATERIAL, UPDATE_THEME, UPDATE_THEME_PROPERTY, UPDATE_USER_SETTINGS, USE_AGENT,
  USE_PLATFORM_AGENT
} from './actions';

export const ACTION_CREATORS = {
  // step actions
  nextStep: () => ({ type: NEXT_STEP }),
  previousStep: () => ({ type: PREVIOUS_STEP }),
  setStep: (step, initialScreen) => ({
    type: SET_STEP,
    payload: { step, initialScreen }
  }),
  selectAgent: selectedTemplateAgentId => ({
    type: SELECT_AGENT,
    payload: { selectedTemplateAgentId }
  }),
  // use agent
  useAgentRequest: () => ({
    type: USE_AGENT.REQUEST
  }),
  useAgentSuccess: result => ({
    type: USE_AGENT.SUCCESS,
    payload: { result }
  }),
  useAgentError: result => ({
    type: USE_AGENT.ERROR,
    payload: { result }
  }),
  setAgentName: agentName => ({
    type: SET_AGENT_NAME,
    payload: { agentName }
  }),
  setAgentRole: agentRole => ({
    type: SET_AGENT_ROLE,
    payload: { agentRole }
  }),
  setAgentChattiness: agentChattiness => ({
    type: SET_AGENT_CHATTINESS,
    payload: { agentChattiness }
  }),
  // use platform agent
  usePlatformAgentRequest: () => ({
    type: USE_PLATFORM_AGENT.REQUEST
  }),
  usePlatformAgentSuccess: result => ({
    type: USE_PLATFORM_AGENT.SUCCESS,
    payload: { result }
  }),
  usePlatformAgentError: (result, { tryOnce }) => ({
    type: USE_PLATFORM_AGENT.ERROR,
    payload: { result, tryOnce }
  }),
  // get platform agent
  getPlatformAgentRequest: () => ({
    type: GET_PLATFORM_AGENT.REQUEST
  }),
  getPlatformAgentSuccess: (result, step) => ({
    type: GET_PLATFORM_AGENT.SUCCESS,
    payload: { result, step }
  }),
  getPlatformAgentError: (result) => ({
    type: GET_PLATFORM_AGENT.ERROR,
    payload: { result }
  }),
  // update agent
  updateAgentRequest: () => ({
    type: UPDATE_AGENT.REQUEST
  }),
  updateAgentSuccess: result => ({
    type: UPDATE_AGENT.SUCCESS,
    payload: { result }
  }),
  updateAgentError: result => ({
    type: UPDATE_AGENT.ERROR,
    payload: { result }
  }),
  // update agent property
  updateAgentPropertyRequest: () => ({
    type: UPDATE_AGENT_PROPERTY.REQUEST
  }),
  updateAgentPropertySuccess: result => ({
    type: UPDATE_AGENT_PROPERTY.SUCCESS,
    payload: { result }
  }),
  updateAgentPropertyError: result => ({
    type: UPDATE_AGENT_PROPERTY.ERROR,
    payload: { result }
  }),
  // save platform agent embed
  savePlatformAgentEmbedRequest: () => ({
    type: SAVE_PLATFORM_AGENT_EMBED.REQUEST
  }),
  savePlatformAgentEmbedSuccess: result => ({
    type: SAVE_PLATFORM_AGENT_EMBED.SUCCESS,
    payload: { result }
  }),
  savePlatformAgentEmbedError: result => ({
    type: SAVE_PLATFORM_AGENT_EMBED.ERROR,
    payload: { result }
  }),
  // save platform agent pages
  savePlatformAgentPagesRequest: () => ({
    type: SAVE_PLATFORM_AGENT_PAGES.REQUEST
  }),
  savePlatformAgentPagesSuccess: result => ({
    type: SAVE_PLATFORM_AGENT_PAGES.SUCCESS,
    payload: { result }
  }),
  savePlatformAgentPagesError: result => ({
    type: SAVE_PLATFORM_AGENT_PAGES.ERROR,
    payload: { result }
  }),
  // delte platform agent
  deletePlatformAgentRequest: () => ({
    type: DELETE_PLATFORM_AGENT.REQUEST
  }),
  deletePlatformAgentSuccess: result => ({
    type: DELETE_PLATFORM_AGENT.SUCCESS,
    payload: { result }
  }),
  deletePlatformAgentError: result => ({
    type: DELETE_PLATFORM_AGENT.ERROR,
    payload: { result }
  }),
  // save jotform api to platform
  saveProviderApiKeyRequest: () => ({
    type: SAVE_PROVIDER_API_KEY.REQUEST
  }),
  saveProviderApiKeySuccess: result => ({
    type: SAVE_PROVIDER_API_KEY.SUCCESS,
    payload: { result }
  }),
  saveProviderApiKeyError: result => ({
    type: SAVE_PROVIDER_API_KEY.ERROR,
    payload: { result }
  }),
  // theme customization
  updateThemeRequest: () => ({
    type: UPDATE_THEME.REQUEST
  }),
  updateThemeSuccess: (result, themeName) => ({
    type: UPDATE_THEME.SUCCESS,
    payload: { result, themeName }
  }),
  updateThemeError: () => ({
    type: UPDATE_THEME.ERROR
  }),
  // theme property customization
  updateThemePropertyRequest: () => ({
    type: UPDATE_THEME_PROPERTY.REQUEST
  }),
  updateThemePropertySuccess: result => ({
    type: UPDATE_THEME_PROPERTY.SUCCESS,
    payload: { result }
  }),
  updateThemePropertyError: () => ({
    type: UPDATE_THEME_PROPERTY.ERROR
  }),
  // update user settings
  updateUserSettingsRequest: () => ({
    type: UPDATE_USER_SETTINGS.REQUEST
  }),
  updateUserSettingsSuccess: result => ({
    type: UPDATE_USER_SETTINGS.SUCCESS,
    payload: { result }
  }),
  updateUserSettingsError: () => ({
    type: UPDATE_USER_SETTINGS.ERROR
  }),
  // customizations
  updateCustomization: (key, value) => ({
    type: UPDATE_CUSTOMIZATION,
    payload: { key, value }
  }),
  updateCustomizationRequest: () => ({
    type: UPDATE_CUSTOMIZATION_ASYNC.REQUEST
  }),
  updateCustomizationSuccess: () => ({
    type: UPDATE_CUSTOMIZATION_ASYNC.SUCCESS
  }),
  updateCustomizationError: () => ({
    type: UPDATE_CUSTOMIZATION_ASYNC.ERROR
  }),
  termsChecked: value => ({
    type: TERMS_ACCEPTED,
    payload: value
  }),
  // add material
  addMaterialRequest: () => ({
    type: ADD_MATERIAL.REQUEST
  }),
  addMaterialSuccess: result => ({
    type: ADD_MATERIAL.SUCCESS,
    payload: { result }
  }),
  addMaterialError: () => ({
    type: ADD_MATERIAL.ERROR
  }),
  // update material
  updateMaterialRequest: () => ({
    type: UPDATE_MATERIAL.REQUEST
  }),
  updateMaterialSuccess: result => ({
    type: UPDATE_MATERIAL.SUCCESS,
    payload: { result }
  }),
  updateMaterialError: () => ({
    type: UPDATE_MATERIAL.ERROR
  }),
  // delete material
  deleteMaterialRequest: () => ({
    type: DELETE_MATERIAL.REQUEST
  }),
  deleteMaterialSuccess: (result, materialId) => ({
    type: DELETE_MATERIAL.SUCCESS,
    payload: { result, materialId }
  }),
  deleteMaterialError: () => ({
    type: DELETE_MATERIAL.ERROR
  }),
  // bulk delete material
  bulkDeleteMaterialRequest: () => ({
    type: BULK_DELETE_MATERIAL.REQUEST
  }),
  bulkDeleteMaterialSuccess: (result, materialIds) => ({
    type: BULK_DELETE_MATERIAL.SUCCESS,
    payload: { result, materialIds }
  }),
  bulkDeleteMaterialError: () => ({
    type: BULK_DELETE_MATERIAL.ERROR
  }),
  checkAIChatbotLimitsRequest: () => ({
    type: CHECK_AI_CHATBOT_LIMITS.REQUEST
  }),
  checkAIChatbotLimitsSuccess: result => ({
    type: CHECK_AI_CHATBOT_LIMITS.SUCCESS,
    payload: { result }
  }),
  checkAIChatbotLimitsError: error => ({
    type: CHECK_AI_CHATBOT_LIMITS.ERROR,
    payload: error
  }),
  setPrompt: prompt => ({
    type: SET_PROMPT,
    payload: { prompt }
  }),
  setUser: user => ({
    type: SET_USER,
    payload: { user }
  }),
  // get platform settings
  getPlatformSettingsRequest: () => ({
    type: GET_PLATFORM_SETTINGS.REQUEST
  }),
  getPlatformSettingsSuccess: result => ({
    type: GET_PLATFORM_SETTINGS.SUCCESS,
    payload: { result }
  }),
  getPlatformSettingsError: result => ({
    type: GET_PLATFORM_SETTINGS.ERROR,
    payload: { result }
  }),
  setPlatformSettings: platformSettings => ({
    type: SET_PLATFORM_SETTINGS,
    payload: { platformSettings }
  }),
  setPageSaveDisabled: isDisabled => ({
    type: SET_PAGE_SAVE_DISABLED,
    payload: { isDisabled }
  }),
  setSelectedPages: selectedPages => ({
    type: SET_SELECTED_PLATFORM_PAGES,
    payload: { selectedPages }
  }),
  // fetch user
  fetchUserRequest: () => ({
    type: FETCH_USER.REQUEST
  }),
  fetchUserSuccess: result => ({
    type: FETCH_USER.SUCCESS,
    payload: { result }
  }),
  fetchUserError: result => ({
    type: FETCH_USER.ERROR,
    payload: { result }
  }),
  // set provider api key
  setProviderApiKey: apiKey => ({
    type: SET_PROVIDER_API_KEY,
    payload: { apiKey }
  }),
  // set initial loading
  setInitialLoading: isLoading => ({
    type: SET_INITAL_LOADING,
    payload: { isLoading }
  }),
  setTryGetPlatformAgentOnce: tryOnce => ({
    type: SET_GET_PLATFORM_AGENT_ONCE,
    payload: { tryOnce }
  }),
  setWpPageSelectionSeen: () => ({
    type: SET_WP_PAGE_SELECTION_SEEN
  }),
  getAllAgentsRequest: () => ({
    type: GET_ALL_AGENTS.REQUEST
  }),
  getAllAgentsSuccess: agents => ({
    type: GET_ALL_AGENTS.SUCCESS,
    payload: { agents }
  }),
  getAllAgentsError: () => ({
    type: GET_ALL_AGENTS.ERROR
  }),
  // get avatar gallery
  getAvatarsRequest: () => ({
    type: GET_AVATARS.REQUEST
  }),
  getAvatarsSuccess: result => ({
    type: GET_AVATARS.SUCCESS,
    payload: { result }
  }),
  getAvatarsError: result => ({
    type: GET_AVATARS.ERROR,
    payload: { result }
  }),
  setAvatars: (avatars, selectedAvatar) => ({
    type: SET_AVATARS,
    payload: { avatars, selectedAvatar }
  }),
  setAgentLanguage: language => ({
    type: SET_LANGUAGE,
    payload: { language }
  }),
  setAgentToneOfVoice: toneOfVoice => ({
    type: SET_TONE_OF_VOICE,
    payload: { toneOfVoice }
  }),
  resetAvatars: () => ({
    type: RESET_AVATARS
  }),
  setIsLimitDialogVisible: isLimitDialogVisible => ({
    type: SET_LIMIT_DIALOG_VISIBLE,
    payload: { isLimitDialogVisible }
  })
};
