const SET_TOKEN = "SET_TOKEN";
const SET_USER = "SET_USER";

export const MODULE_NAME = "auth";

export const getToken = (state) => state[MODULE_NAME].token;
export const getUser = (state) => state[MODULE_NAME].user;

const guest = {
  userId: null,
  name: "Guest",
  surname: null,
  email: null,
  password: null,
  profilePicture: null,
};

const initialState = {
  token: null,
  user: guest,
};

export const reducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return {
        ...store,
        token: payload,
      };
    case SET_USER:
      return {
        ...store,
        user: payload,
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
export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload: payload,
  };
};

//Middlewares
export const login = ({ token, user }) => {
  return (dispatch) => {
    console.log(`User in redux ${user}`);
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
