import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { apiService } from './services/ApiService';

import App from './App';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

apiService.setAccessToken(accessToken);

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
