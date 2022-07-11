import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createStore, Store } from 'redux';
import { reducer, Action } from './store/reducer';
import { Provider } from 'react-redux';

import LoginDetail from './models/LoginDetail';

const store:Store<LoginDetail, Action> = createStore(reducer)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
