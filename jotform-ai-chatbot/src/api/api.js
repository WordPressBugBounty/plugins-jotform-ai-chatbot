import { PLATFORMS } from '../constants';
import { platformSettings } from '../utils';
import { getPlatformLayer } from './platformLayerSingleton';
import { getRequestLayer } from './requestLayerSingleton';

const createFormData = data => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

const addWpNonce = formData => {
  const { PLATFORM_NONCE, PLATFORM_REFERER } = platformSettings;
  const shouldAddNonce = PLATFORM_NONCE && PLATFORM_REFERER;
  if (!shouldAddNonce) return formData;
  formData.append('_nonce', PLATFORM_NONCE);
  formData.append('_wp_http_referer ', PLATFORM_REFERER);
  return formData;
};

const getBaseURL = () => {
  const { PLATFORM, PROVIDER_API_URL } = platformSettings;
  return (Object.values(PLATFORMS).includes(PLATFORM) ? PROVIDER_API_URL : '/API');
};

export const fetcUser = apiKey => getRequestLayer().get(`user?getUserFromWordpressChatbotPlugin=true&apikey=${apiKey}`);

export const addApiKeyToUrl = (url, apiKey = '') => (apiKey ? `${url}?apikey=${apiKey}` : url);

export const acceptBeta = async (apiKey = '') => {
  const formData = new FormData();
  formData.append('aiAgentBetaUser', '1');
  formData.append('AIAgentBetaAccepted', '1');
  const url = addApiKeyToUrl('user/settings', apiKey);
  return getRequestLayer().post(url, formData);
};

export const apiUsePlatformAgent = (params, apiKey = '') => {
  const url = addApiKeyToUrl('ai-chatbot/use-platform-agent', apiKey);
  return getRequestLayer().post(url, params);
};

export const getPlatformAgent = (params, apiKey = '') => {
  const url = addApiKeyToUrl('ai-chatbot/get-platform-agent', apiKey);
  return getRequestLayer().post(url, params);
};

export const interactWithPlatform = params => {
  let formData = createFormData(params);
  formData = addWpNonce(formData);
  const platformLayer = getPlatformLayer();
  return platformLayer.post('', formData);
};

export const updateAgent = (agentId, params, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}`, apiKey);
  return getRequestLayer().put(url, params);
};

export const updateAgentProperty = (agentId, params, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/properties`, apiKey);
  return getRequestLayer().post(url, params);
};

export const getMaterialById = (agentId, materialId, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/materials/${materialId}`, apiKey);
  return getRequestLayer().get(url);
};

export const addMaterial = (agentId, material, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/materials`, apiKey);
  const config = material.type === 'DOCUMENT' ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  return getRequestLayer().post(url, material, config);
};

export const updateMaterial = (agentId, materialId, updatedMaterial, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/materials/${materialId}`, apiKey);
  const config = updatedMaterial.type === 'DOCUMENT' ? { headers: { 'Content-Type': 'multipart/form-data' }, baseURL: getBaseURL() } : { baseURL: getBaseURL() };
  return getRequestLayer().post(url, updatedMaterial, config);
};

export const deleteMaterial = (agentId, materialId, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/materials/${materialId}`, apiKey);
  return getRequestLayer().delete(url);
};

export const bulkDeleteMaterial = (agentId, materialIds, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/materials/bulk_delete`, apiKey);
  return getRequestLayer().put(url, { id_list: [...materialIds] }, { isFormData: false });
};

export const getAvatars = (agentId, params, apiKey = '') => {
  const url = addApiKeyToUrl(`ai-agent-builder/agents/${agentId}/avatars/gallery`, apiKey);
  return getRequestLayer().post(url, params);
};

export function getAIAgentsLimitExceeded(apiKey) {
  const url = addApiKeyToUrl('user-limit/ai-agents-limit-exceeded', apiKey);
  return getRequestLayer().get(url);
}

export const getSentenceRecommendations = string => getRequestLayer().post('chat/complete-sentence', new URLSearchParams({ prompt: string }));

export const getAllAgents = apiKey => getRequestLayer().get(`mixed-listing/assets?offset=0&limit=1000&orderby=created_at&status=active&assetTypes[0]=ai-agent&addAIAgents=1&apiKey=${apiKey}`);

export const setInstallment = (params, apiKey = '') => {
  const url = addApiKeyToUrl('ai-chatbot/installment', apiKey);
  return getRequestLayer()?.post(url, params);
};
