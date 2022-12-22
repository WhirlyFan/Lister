import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";

import * as listActions from "./store/lists";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.listActions = listActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
