import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  reducer as blogsRecuder,
  MODULE_NAME as blogsModuleName,
} from "./blogs.js";
import {
  reducer as appStateReducer,
  MODULE_NAME as appStateModuleName,
} from "./appState.js";
import {
  reducer as blogRecuder,
  MODULE_NAME as blogModuleName,
} from "./single-blog.js";

const rootReducer = combineReducers({
  [blogsModuleName]: blogsRecuder,
  [appStateModuleName]: appStateReducer,
  [blogModuleName]: blogRecuder,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
