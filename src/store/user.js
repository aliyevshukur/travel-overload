import { updateUserProfilePicture } from "./auth";

const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
const UPLOAD_PROFILE_PICTURE_SUCCESS = "SET_USER_IMAGE_SUCCESS";
const UPLOAD_PROFILE_PICTURE_ERROR = "UPLOAD_PROFILE_PICTURE_ERROR";

export const MODULE_NAME = "user";
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  loading: false,
  error: null,
  profilePicture: null,
};

export const getProfilePicture = (store) => store[MODULE_NAME].profilePicture;
export const getProfilePictureUploadLoading = (store) =>
  store[MODULE_NAME].loading;
export const getProfilePictureUploadError = (store) => store[MODULE_NAME].error;

// Reducer

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPLOAD_PROFILE_PICTURE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profilePicture: payload,
      };
    case UPLOAD_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Actions

export const setUserImageStart = () => ({
  type: UPLOAD_PROFILE_PICTURE_START,
});

export const setUserImageSuccess = (payload) => ({
  type: UPLOAD_PROFILE_PICTURE_SUCCESS,
  payload: payload,
});

export const setUserImageError = (payload) => ({
  type: UPLOAD_PROFILE_PICTURE_ERROR,
  payload: payload,
});

//Middlewares
export const uploadProfilePicture = (profilePictureUrl, userId) => {
  return (dispatch) => {
    dispatch(setUserImageStart());
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
          dispatch(setUserImageSuccess(result.url));
          dispatch(updateUserProfilePicture(result.url));
          console.log("New profile picture: ", result.url);
        }
      })
      .catch((message) => dispatch(setUserImageError(message)));
  };
};

export const getUserInfo = () => {
  return (dispatch) => {
    fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {})
      .catch((e) => console.log(e));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
