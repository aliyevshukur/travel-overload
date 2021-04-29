// Actions
const SET_IS_TABLET_MODE = "SET_IS_TABLET_MODE";

export const MODULE_NAME = "appState";
export const isTabletMode = (store) => store[MODULE_NAME].isTabletMode;

const initalState = {
  isTabletMode: window.innerWidth < 850,
};

export const reducer = (store = initalState, { type, payload }) => {
  switch (type) {
    case SET_IS_TABLET_MODE:
      return {
        ...store,
        isTabletMode: payload,
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
