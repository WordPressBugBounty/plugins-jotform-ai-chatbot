import { platformSettings } from '../utils';
import { setInstallment } from './api';

const installmentQueue = [];
const installmentCache = {};
window.__jaic_queue = installmentQueue;
window.__jaic_installment_cache = installmentCache;

export const saveInstallment = (action) => {
  const { PROVIDER_API_KEY, PLATFORM_DOMAIN, PLATFORM } = platformSettings;

  const isReady = PROVIDER_API_KEY && PLATFORM_DOMAIN;

  const flushQueue = () => {
    while (installmentQueue.length > 0) {
      const queuedAction = installmentQueue.shift();
      if (!installmentCache[queuedAction]) {
        installmentCache[queuedAction] = true;
        setInstallment({
          action: queuedAction,
          platform: PLATFORM,
          domain: PLATFORM_DOMAIN
        });
      }
    }
  };

  if (!isReady && action && !installmentCache[action]) {
    installmentQueue.push(action);
    return;
  }

  if (isReady && action && !installmentCache[action]) {
    flushQueue();

    setInstallment({
      action,
      platform: PLATFORM,
      domain: PLATFORM_DOMAIN
    });

    installmentCache[action] = true;
  }
};
