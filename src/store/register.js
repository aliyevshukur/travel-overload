const REGISTER_START = "REGISTER_START";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_ERROR = "REGISTER_ERROR";

export const MODULE_NAME = "register";
const API_URL = process.env.REACT_APP_API_URL;

export const initialState = {
  loading: false,
  error: null,
  isSuccess: null,
};

export const getIsSuccess = (state) => state[MODULE_NAME].isSuccess;
export const getLoading = (state) => state[MODULE_NAME].loading;
export const getError = (state) => state[MODULE_NAME].error;

// Reducer
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
        isSuccess: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        isSuccess: false,
      };
    default:
      return state;
  }
};

// Actions
export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});
export const registerError = (payload) => ({
  type: REGISTER_ERROR,
  payload: payload,
});

// Middlewares
export const register = (userInfo) => {
  return (dispatch) => {
    dispatch(registerStart());
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((res) => handleErrors(res))
      .then((result) => {
        // console.log(`Result in dispatch ${JSON.stringify(result)}`);
        if (result.message === "success") {
          dispatch(registerSuccess(result.message));
        }
        return result.message;
      })
      .catch((message) => dispatch(registerError(message)));
  };
};

function handleErrors(response) {
  console.log(`REsponse ${JSON.stringify(response)}`);
  if (!response.ok) {
    throw Error(response.message);
  }
  return response;
}
