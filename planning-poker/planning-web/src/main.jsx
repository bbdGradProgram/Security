import React from 'react';
/* eslint-disable node/file-extension-in-import */
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root')).render(<React.StrictMode>
  <App />
</React.StrictMode>);
