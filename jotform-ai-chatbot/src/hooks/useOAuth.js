/* eslint-disable max-len */
import { useEffect, useRef } from 'react';

const PROJECT_NAME = 'Jotform Wordpress AI Chatbot';
const PROJECT_URL = window.location.href;
const ENTERPRISE_LOGIN_ENDPOINT = '/api/legacy-oauth/enterprise-domain';

const openJFAuthPopup = () => window.open(
  `https://www.jotform.com/api/oauth.php?registrationType=oauth&client_id=${encodeURIComponent(PROJECT_NAME)}&access_type=full&auth_type=login&ref=${encodeURIComponent(PROJECT_URL)}&integration_auth=1&isNewLoginFlow=1&enterpriseLoginEndpoint=${encodeURIComponent(ENTERPRISE_LOGIN_ENDPOINT)}&rk=1`,
  '_self'
);

export const useOAuth = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleLoginClick = async () => {
      openJFAuthPopup();
    };
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleLoginClick);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleLoginClick);
      }
    };
  }, [buttonRef]);

  return { buttonRef };
};
