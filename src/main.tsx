// import { store } from './store';
import { App } from './app';
import React from 'react';
import ReactDom from 'react-dom/client';
// import { Provider } from 'react-redux';

import './index.scss'

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
);
