import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { APPLICATION_ELEMENT_ID } from "./config";
import { Provider, RootStore } from "./store/RootStore";

export const rootStore = RootStore.create();

ReactDOM.render(
  <Provider value={rootStore}>
      <React.StrictMode>
          <App/>
      </React.StrictMode>
  </Provider>,
  document.getElementById(APPLICATION_ELEMENT_ID)
);
