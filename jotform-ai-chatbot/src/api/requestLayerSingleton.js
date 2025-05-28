import { getBaseURL, platformSettings } from '../utils';
import { createAxiosInstance } from './base';

const isPlatformProduction = () => {
  const { PROVIDER_API_URL } = platformSettings;
  return PROVIDER_API_URL?.includes('api.jotform.com');
};

const createLayer = () => createAxiosInstance(getBaseURL(), !isPlatformProduction());

let requestLayer = createLayer();

export const reinitializeRequestLayer = () => {
  requestLayer = createLayer();
};

export const getRequestLayer = () => {
  if (!requestLayer) {
    throw new Error('RequestLayer is not initialized. Call initializeRequestLayer first.');
  }
  return requestLayer;
};
