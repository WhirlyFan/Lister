import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";

import * as listActions from "./store/lists";
import * as reviewActions from "./store/reviews";
import * as followerActions from "./store/follower";
import { ModalProvider } from "./context/Modal";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.listActions = listActions;
  window.reviewActions = reviewActions;
  window.followerActions = followerActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
