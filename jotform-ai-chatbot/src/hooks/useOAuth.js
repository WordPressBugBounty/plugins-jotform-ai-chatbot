/* eslint-disable max-len */
import {
  useCallback, useEffect, useRef, useState
} from 'react';

const PROJECT_NAME = 'Jotform Wordpress AI Chatbot';

const openJFAuthPopup = jotformUrl => {
  const w = 458;
  const h = 458;
  let y = global.outerHeight / 2 + global.screenY - h / 2;
  let x = global.outerWidth / 2 + global.screenX - w / 2;
  try {
    y = global.top.outerHeight / 2 + global.top.screenY - h / 2;
    x = global.top.outerWidth / 2 + global.top.screenX - w / 2;
  } catch (err) {
    // error accessing to cross origin frame. Do nothing.
  }

  return global.open(
    `${jotformUrl}/api/oauth.php?registrationType=oauth&client_id=${encodeURIComponent(PROJECT_NAME)}&access_type=full&auth_type=login&ref=${encodeURIComponent(global.document.location.href)}&integration_auth=1`,
    '_blank',
    `toolbar=0,location=0,menubar=0,width=${w},height=${h},top=${y},left=${x}`
  );
};

export const useOAuth = jotformUrl => {
  const buttonRef = useRef(null);
  const [popup, setPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const handleLoginClick = async () => {
      const newPopup = openJFAuthPopup(jotformUrl);
      setPopup(newPopup);
      setIsLoading(true);
    };
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleLoginClick);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleLoginClick);
      }
    };
  }, [buttonRef, jotformUrl]);

  const removePopup = useCallback(() => {
    if (popup && popup.closed) {
      setPopup(null);
      setIsLoading(false);
    }
  }, [popup]);

  useEffect(() => {
    const checkPopupInterval = setInterval(removePopup, 500);
    return () => clearInterval(checkPopupInterval);
  }, [removePopup]);

  useEffect(() => {
    if (!popup) return;
    const handlePostMessage = event => {
      const data = event?.data || '';
      const match = data?.match?.(/login:(.*)/);
      if (match) {
        setApiKey(match[1]);
      }
      if (popup && typeof data === 'string' && (data === '' || data.includes('login:'))) {
        popup.close();
      }
    };
    global.addEventListener('message', handlePostMessage);
    return () => {
      global.removeEventListener('message', handlePostMessage);
    };
  }, [popup]);

  return { buttonRef, isLoading, apiKey };
};
