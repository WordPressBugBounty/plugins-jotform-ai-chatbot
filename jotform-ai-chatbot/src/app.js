import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { ChatbotGenerator } from './components';

// eslint-disable-next-line no-undef
const root = createRoot(document.getElementById('chatbot-app'));
root.render(<ChatbotGenerator />);
