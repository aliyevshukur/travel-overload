const profilePicture = require("../assets/guest.png");

const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
const UPLOAD_PROFILE_PICTURE_SUCCESS = "SET_USER_IMAGE_SUCCESS";
const UPLOAD_PROFILE_PICTURE_ERROR = "UPLOAD_PROFILE_PICTURE_ERROR";

const GET_USER_BLOGS_START = "GET_USER_BLOGS_START";
const GET_USER_BLOGS_SUCCESS = "GET_USER_BLOGS_SUCCESS";
const GET_USER_BLOGS_ERROR = "GET_USER_BLOGS_ERROR";

const SET_USER = "SET_USER";
const SET_USER_PROFILE_PICTURE = "SET_USER_PROFILE_PICTURE";

export const MODULE_NAME = "user";
const API_URL = process.env.REACT_APP_API_URL;

export const guest = {
  userId: null,
  name: "Guest",
  surname: "",
  email: null,
  password: null,
  profilePicture: profilePicture,
};

const initialState = {
  user: null,
  profilePictureUploadloading: false,
  profilePictureUploaderror: null,
  blogsLoading: false,
  blogsError: null,
  blogs: [],
};

export const getUser = (state) => state[MODULE_NAME].user;
export const getProfilePictureUploadLoading = (store) =>
  store[MODULE_NAME].profilePictureUploadloading;
export const getProfilePictureUploadError = (store) => store[MODULE_NAME].error;
export const getUserBlogs = (store) => store[MODULE_NAME].blogs;

// Reducer

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
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePictureUploadloading: false,
        profilePictureUploaderror: null,
      };
    case UPLOAD_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePictureUploadloading: false,
        profilePictureUploaderror: payload,
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

export const fetchUserBlogs = (userId) => {
  return (dispatch) => {
    dispatch(setUserBlogsStart());
    fetch(`${API_URL}/user/blogs/`, {
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
      .catch((message) => dispatch(setUserBlogsError(message)));
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

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
