// Actions
const SET_IS_TABLET_MODE = "SET_IS_TABLET_MODE";
const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH";

export const MODULE_NAME = "appState";
export const isTabletMode = (store) => store[MODULE_NAME].isTabletMode;
export const getBreakpoints = (store) => store[MODULE_NAME].breakpoints;
export const getWindowWidth = (store) => store[MODULE_NAME].windowWidth;

const initalState = {
  isTabletMode: window.innerWidth < 850,
  windowWidth: window.innerWidth,
  breakpoints: {
    tablet: 850,
    desktopSmall: 1024,
    desktop: 1300,
  },
};

export const reducer = (store = initalState, { type, payload }) => {
  switch (type) {
    case SET_IS_TABLET_MODE:
      return {
        ...store,
        isTabletMode: payload,
      };

    case SET_WINDOW_WIDTH:
      return {
        ...store,
        windowWidth: payload,
      };
    default:
      return store;
  }
};

// Action Creators
export const setIsTabletMode = (payload) => ({
  type: SET_IS_TABLET_MODE,
  payload: payload,
});

export const setWindowWidth = (payload) => ({
  type: SET_WINDOW_WIDTH,
  payload: payload,
});
