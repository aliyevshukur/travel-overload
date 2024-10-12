import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import {
  MODULE_NAME as appStateModuleName,
  reducer as appStateReducer,
} from "./appState.js";
import {
  MODULE_NAME as blogsModuleName,
  reducer as blogsRecuder,
} from "./blogs.js";
import {
  reducer as registeReducer,
  MODULE_NAME as registerModuleName,
} from "./register";
import {
  MODULE_NAME as blogModuleName,
  reducer as blogRecuder,
} from "./single-blog.js";

import { MODULE_NAME as authModuleName, reducer as authReducer } from "./auth";

const rootReducer = combineReducers({
  [blogsModuleName]: blogsRecuder,
  [appStateModuleName]: appStateReducer,
  [blogModuleName]: blogRecuder,
  [authModuleName]: authReducer,
  [registerModuleName]: registeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
