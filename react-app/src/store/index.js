import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import listReducer from "./lists";
import jikanReducer from "./jikan";
import animeReducer from "./anime";
import reviewReducer from "./reviews";
import channelReducer from "./channel";

const rootReducer = combineReducers({
  session,
  lists: listReducer,
  jikan: jikanReducer,
  anime: animeReducer,
  reviews: reviewReducer,
  channel: channelReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
