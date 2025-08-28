import {
  ADD_MATERIAL, BULK_DELETE_MATERIAL, CHECK_AI_CHATBOT_LIMITS, DELETE_MATERIAL, DELETE_PLATFORM_AGENT, FETCH_CHATS, FETCH_CONVERSATIONS, FETCH_MATERIALS, FETCH_USER,
  GET_ALL_AGENTS, GET_AVATARS, GET_PLATFORM_AGENT, GET_PLATFORM_SETTINGS, PUBLISH_AGENT, RESET_AVATARS,
  SAVE_PLATFORM_AGENT_PAGES, SAVE_PROVIDER_API_KEY, SET_AGENT_CHATTINESS,
  SET_AGENT_NAME, SET_AGENT_ROLE, SET_AVATARS, SET_FETCH_CONVERSATIONS_LOADING, SET_GET_PLATFORM_AGENT_ONCE, SET_INITAL_LOADING, SET_IS_PUBLISHED, SET_LANGUAGE,
  SET_LIMIT_DIALOG_VISIBLE, SET_PERSONA, SET_PLATFORM_SETTINGS, SET_PROMPT,
  SET_PROVIDER_API_KEY, SET_SELECTED_PAGES, SET_STEP, SET_TONE_OF_VOICE, SET_USER, SET_VISIBLE_DEVICE,
  TERMS_ACCEPTED, UPDATE_AGENT, UPDATE_AGENT_PROPERTY, UPDATE_CUSTOMIZATION,
  UPDATE_CUSTOMIZATION_ASYNC, UPDATE_MATERIAL, UPDATE_THEME, UPDATE_THEME_PROPERTY, UPDATE_USER_SETTINGS,
  USE_PLATFORM_AGENT
} from './actions';

export const ACTION_CREATORS = {
  setStep: (step, initialScreen) => ({
    type: SET_STEP,
    payload: { step, initialScreen }
  }),
  setIsPublished: (isPublished) => ({
    type: SET_IS_PUBLISHED,
    payload: { isPublished }
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
  publishAgentRequest: (key) => ({
    type: PUBLISH_AGENT.REQUEST,
    payload: { key }
  }),
  publishAgentSuccess: (result, key) => ({
    type: PUBLISH_AGENT.SUCCESS,
    payload: { result, key }
  }),
  publishAgentError: result => ({
    type: PUBLISH_AGENT.ERROR,
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
  // fetch materials
  fetchMaterialsRequest: () => ({
    type: FETCH_MATERIALS.REQUEST
  }),
  fetchMaterialsSuccess: result => ({
    type: FETCH_MATERIALS.SUCCESS,
    payload: { result }
  }),
  fetchMaterialsError: () => ({
    type: FETCH_MATERIALS.ERROR
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
  setSelectedPages: selectedPages => ({
    type: SET_SELECTED_PAGES,
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
  }),
  setPersona: persona => ({
    type: SET_PERSONA,
    payload: { persona }
  }),
  updateVisibleDevice: visibleDevice => ({
    type: SET_VISIBLE_DEVICE,
    payload: { visibleDevice }
  }),
  // fetch conversations
  fetchConversationsRequest: () => ({
    type: FETCH_CONVERSATIONS.REQUEST
  }),
  fetchConversationsSuccess: result => ({
    type: FETCH_CONVERSATIONS.SUCCESS,
    payload: { result }
  }),
  fetchConversationsError: result => ({
    type: FETCH_CONVERSATIONS.ERROR,
    payload: { result }
  }),
  setFetchConversationsLoading: loading => ({
    type: SET_FETCH_CONVERSATIONS_LOADING,
    payload: { loading }
  }),
  // fetch chats
  fetchChatsRequest: () => ({
    type: FETCH_CHATS.REQUEST
  }),
  fetchChatsSuccess: result => ({
    type: FETCH_CHATS.SUCCESS,
    payload: { result }
  }),
  fetchChatsError: result => ({
    type: FETCH_CHATS.ERROR,
    payload: { result }
  })
};
