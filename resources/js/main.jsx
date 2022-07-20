import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './hooks';

const Main = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Main;

ReactDOM.createRoot(document.getElementById('app')).render(
  <Main />
);