import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const rootReducer = combineReducers({
  ...reducers,
});

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware), ...enhancers)
);

export default store;
