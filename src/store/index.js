import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  reducer as blogsRecuder,
  MODULE_NAME as blogsModuleName,
} from "./blogs.js";

const rootReducer = combineReducers({ [blogsModuleName]: blogsRecuder });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
