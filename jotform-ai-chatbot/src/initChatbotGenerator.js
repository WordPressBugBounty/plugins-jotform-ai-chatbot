import React from 'react';
import { createRoot } from 'react-dom/client';

import { ChatbotGenerator } from './components';
import { getRootElement } from './utils';

export const initChatbotGenerator = ({ selector = '#chatbot-app', ...props } = {}) => {
  const rootEl = getRootElement(selector);
  const root = createRoot(rootEl);

  root.render(
    <ChatbotGenerator {...props} />
  );
};

export default initChatbotGenerator;
