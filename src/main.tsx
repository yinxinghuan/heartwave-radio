import './game-id';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.less';
import { detectLocale } from './HeartwaveRadio/i18n';

document.documentElement.lang = detectLocale();

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
