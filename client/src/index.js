import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/LoginContext';

// Ensure root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element 'root' not found in the document.");
}

// Render the app
ReactDOM.render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </React.StrictMode>,
  rootElement
);
