import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/tailwind.css'
import './assets/css/app.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {renderRoutes} from 'react-router-config'
import routes from './routes/Routes'

ReactDOM.render(
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
