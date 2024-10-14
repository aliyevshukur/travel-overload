const UPLOAD_PROFILE_PICTURE_START = "UPLOAD_PROFILE_PICTURE_START";
const UPLOAD_PROFILE_PICTURE_SUCCESS = "SET_USER_IMAGE_SUCCESS";
const UPLOAD_PROFILE_PICTURE_ERROR = "UPLOAD_PROFILE_PICTURE_ERROR";

export const MODULE_NAME = "user";
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  loading: false,
  error: null,
  image: null,
};

export const getUserImage = (store) => store[MODULE_NAME].image;
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
        image: payload,
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
    fetch(`${API_URL}/user/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(profilePictureUrl),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "success") {
          dispatch(setUserImageSuccess(result.message));
        }
        return result.message;
      })
      .catch((message) => dispatch(setUserImageError(message)));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
