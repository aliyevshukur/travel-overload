import { guest, setUser } from "./user";

const SET_TOKEN = "SET_TOKEN";

export const MODULE_NAME = "auth";

export const getToken = (state) => state[MODULE_NAME].token;

const initialState = {
  token: null,
};

export const reducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return {
        ...store,
        token: payload,
      };
    default:
      return store;
  }
};

// Actions
export const setToken = (payload) => {
  return {
    type: SET_TOKEN,
    payload: payload,
  };
};

//Middlewares
export const login = ({ token, user }) => {
  return (dispatch) => {
    // console.log(`User in redux ${user}`);
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(guest));
  };
};
