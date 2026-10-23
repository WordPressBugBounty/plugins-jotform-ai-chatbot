const STORAGE_KEY = 'jotform_ai_chatbot_login_state';
export const LOGIN_STATE_PARAM = 'jaic_login_state';

export const createLoginReturnURL = () => {
  const bytes = global.crypto.getRandomValues(new Uint8Array(32));
  const state = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  global.sessionStorage.setItem(STORAGE_KEY, state);
  const url = new URL(global.location.href);
  url.searchParams.delete('code');
  url.searchParams.delete('domain');
  url.searchParams.set(LOGIN_STATE_PARAM, state);
  return url.toString();
};

export const consumeLoginState = (state) => {
  const expected = global.sessionStorage.getItem(STORAGE_KEY);
  global.sessionStorage.removeItem(STORAGE_KEY);
  return !!expected && state === expected;
};
