// Actions
const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_FAILURE";

const LOGOUT_START = "LOGOUT_START";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_ERROR = "LOGOUT_ERROR";

export const MODULE_NAME = "auth";

const initialState = {
  authenticated: false,
  token: null,
  user: null,
  error: null,
};

export const reducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...store,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...store,
        loading: false,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...store,
        loading: false,
        error: null,
      };
    case LOGOUT_START:
      return {
        ...store,
        loading: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...store,
        loading: false,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        ...store,
        loading: false,
        error: null,
      };
    default:
      return store;
  }
};

// Actions

export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};
export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

export const loginError = (payload) => {
  return {
    type: LOGIN_ERROR,
    payload: payload,
  };
};

export const logoutStart = () => {
  return {
    type: LOGOUT_START,
  };
};

export const logoutSuccess = (payload) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: payload,
  };
};

export const logoutError = (payload) => {
  return {
    type: LOGOUT_ERROR,
    payload: payload,
  };
};
