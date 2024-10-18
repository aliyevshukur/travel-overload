import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { logoutUser } from "./auth";

const profilePicture = require("../assets/guest.png");

const SET_USER = "SET_USER";
const SET_USER_PROFILE_PICTURE = "SET_USER_PROFILE_PICTURE";

const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
const UPLOAD_PROFILE_PICTURE_SUCCESS = "SET_USER_IMAGE_SUCCESS";
const UPLOAD_PROFILE_PICTURE_ERROR = "UPLOAD_PROFILE_PICTURE_ERROR";

const GET_USER_BLOGS_START = "GET_USER_BLOGS_START";
const GET_USER_BLOGS_SUCCESS = "GET_USER_BLOGS_SUCCESS";
const GET_USER_BLOGS_ERROR = "GET_USER_BLOGS_ERROR";

const PASSWORD_CHANGE_START = "PASSWORD_CHANGE_START";
const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
const PASSWORD_CHANGE_ERROR = "PASSWORD_CHANGE_ERROR";

const NAME_CHANGE_START = "NAME_CHANGE_START";
const NAME_CHANGE_SUCCESS = "NAME_CHANGE_SUCCESS";
const NAME_CHANGE_ERROR = "NAME_CHANGE_ERROR";

export const MODULE_NAME = "user";
const API_URL = process.env.REACT_APP_API_URL;

export const guest = {
  _id: null,
  name: "Guest",
  surname: "",
  email: null,
  password: null,
  profilePicture: profilePicture,
};

const initialState = {
  user: guest,

  profilePictureUploadloading: false,
  profilePictureUploadError: null,
  profilePictureUploadSuccess: null,

  passwordChangeLoading: false,
  passwordChangeError: null,
  passwordChangeSuccess: null,

  nameChangeLoading: false,
  nameChangeError: null,
  nameChangeSuccess: null,

  blogsLoading: false,
  blogsError: null,
  blogs: [],
};

export const getUser = (state) => state[MODULE_NAME].user;

// Profile picture upload
export const getProfilePictureUploadLoading = (store) =>
  store[MODULE_NAME].profilePictureUploadloading;
export const getProfilePictureUploadError = (store) =>
  store[MODULE_NAME].profilePictureUploadError;
export const getProfilePictureUploadSuccess = (store) =>
  store[MODULE_NAME].profilePictureUploadSuccess;

// Password change
export const getPasswordChangeLoading = (store) =>
  store[MODULE_NAME].passwordChangeLoading;
export const getPasswordChangeError = (store) =>
  store[MODULE_NAME].passwordChangeError;
export const getPasswordChangeSuccess = (store) =>
  store[MODULE_NAME].passwordChangeSuccess;

// Name change
export const getNameChangeLoading = (store) =>
  store[MODULE_NAME].nameChangeLoading;
export const getNameChangeError = (store) => store[MODULE_NAME].nameChangeError;
export const getNameChangeSuccess = (store) =>
  store[MODULE_NAME].nameChangeSuccess;

// User blogs
export const getUserBlogsLoading = (store) => store[MODULE_NAME].blogsLoading;
export const getUserBlogsError = (store) => store[MODULE_NAME].blogsError;
export const getUserBlogs = (store) => store[MODULE_NAME].blogs;

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_USER_PROFILE_PICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: payload,
        },
      };
    case UPLOAD_PROFILE_PICTURE_START:
      return {
        ...state,
        profilePictureUploadloading: true,
        profilePictureUploaderror: null,
        profilePictureUploadSuccess: null,
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePictureUploadloading: false,
        profilePictureUploaderror: null,
        profilePictureUploadSuccess: payload,
      };
    case UPLOAD_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePictureUploadloading: false,
        profilePictureUploaderror: payload,
        profilePictureUploadSuccess: null,
      };
    case GET_USER_BLOGS_START:
      return {
        ...state,
        blogsLoading: true,
        blogsError: null,
      };
    case GET_USER_BLOGS_SUCCESS:
      return {
        ...state,
        blogsLoading: false,
        blogsError: null,
        blogs: payload,
      };
    case GET_USER_BLOGS_ERROR:
      return {
        ...state,
        blogsLoading: false,
        blogsError: payload,
      };
    case PASSWORD_CHANGE_START:
      return {
        ...state,
        passwordChangeLoading: true,
        passwordChangeError: null,
        passwordChangeSuccess: null,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChangeError: null,
        passwordChangeSuccess: payload,
      };
    case PASSWORD_CHANGE_ERROR:
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChangeError: payload,
        passwordChangeSuccess: null,
      };
    case NAME_CHANGE_START:
      return {
        ...state,
        nameChangeLoading: true,
        nameChangeError: null,
        nameChangeSuccess: null,
      };
    case NAME_CHANGE_SUCCESS:
      return {
        ...state,
        nameChangeLoading: false,
        nameChangeError: null,
        nameChangeSuccess: payload,
      };
    case NAME_CHANGE_ERROR:
      return {
        ...state,
        nameChangeLoading: false,
        nameChangeError: payload,
        nameChangeSuccess: null,
      };

    default:
      return state;
  }
};

//Actions

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload: payload,
  };
};

export const uploadProfilePictureStart = () => ({
  type: UPLOAD_PROFILE_PICTURE_START,
});

export const uploadProfilePictureSuccess = (payload) => ({
  type: UPLOAD_PROFILE_PICTURE_SUCCESS,
  payload: payload,
});

export const uploadProfilePictureError = (payload) => ({
  type: UPLOAD_PROFILE_PICTURE_ERROR,
  payload: payload,
});

export const setUserBlogsStart = () => ({
  type: GET_USER_BLOGS_START,
});

export const setUserBlogsSuccess = (payload) => ({
  type: GET_USER_BLOGS_SUCCESS,
  payload: payload,
});

export const setUserBlogsError = (payload) => ({
  type: GET_USER_BLOGS_ERROR,
  payload: payload,
});

export const passwordChangeStart = () => ({
  type: PASSWORD_CHANGE_START,
});

export const passwordChangeSuccess = (payload) => ({
  type: PASSWORD_CHANGE_SUCCESS,
  payload: payload,
});

export const passwordChangeError = (payload) => ({
  type: PASSWORD_CHANGE_ERROR,
  payload: payload,
});

export const changeNameStart = () => ({
  type: NAME_CHANGE_START,
});

export const changeNameSuccess = (payload) => ({
  type: NAME_CHANGE_SUCCESS,
  payload,
});

export const changeNameError = (payload) => ({
  type: NAME_CHANGE_ERROR,
  payload: payload,
});

//Middlewares
export const uploadProfilePicture = (profilePictureUrl) => {
  return (dispatch) => {
    dispatch(uploadProfilePictureStart());
    fetch(`${API_URL}/user/profile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url: profilePictureUrl }),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          dispatch(uploadProfilePictureSuccess(result.url));
          dispatch(fetchUser());
          console.log("New profile picture: ", result.url);
        }
      })
      .catch((message) => dispatch(uploadProfilePictureError(message)));
  };
};

export const fetchUserBlogs = () => {
  return (dispatch) => {
    dispatch(setUserBlogsStart());
    fetch(`${API_URL}/user/blogs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          dispatch(setUserBlogsSuccess(result.blogs));
        }
      })
      .catch((error) => dispatch(setUserBlogsError(error.message)));
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    console.log("New user fetch started");
    fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          console.log("Fetched new user info");
          dispatch(setUser(result.user));
        } else {
          console.log(`Something went wrong ${result.message}`);
        }
      })
      .catch((message) => console.log(`Error ${message}`));
  };
};

export const changePassword = (newPassword, oldPassword) => {
  return (dispatch) => {
    dispatch(passwordChangeStart());
    fetch(`${API_URL}/user/password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ newPassword, oldPassword }),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        console.log(`REUSLT ${JSON.stringify(result)}`);
        if (result.ok) {
          dispatch(passwordChangeSuccess(result.message));
          dispatch(logoutUser());
        } else {
          dispatch(passwordChangeError(result.message));
        }
      })
      .catch((error) => {
        dispatch(passwordChangeError(error.message));
      });
  };
};

export const changeName = (name, surname, password) => {
  return (dispatch) => {
    dispatch(changeNameStart());
    fetch(`${API_URL}/user/name`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, surname, password }),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          dispatch(changeNameSuccess(result.message));
          dispatch(fetchUser());
        } else {
          dispatch(changeNameError(result.message));
        }
      })
      .catch((error) => dispatch(changeNameError(error.message)));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
