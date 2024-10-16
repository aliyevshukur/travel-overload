// Actions
const FETCH_BLOG_START = "FETCH_BLOG_START";
const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";
const FETCH_BLOG_ERROR = "FETCH_BLOG_ERROR";

export const MODULE_NAME = "BLOG";
const API_URL = process.env.REACT_APP_API_URL;

export const getBlog = (state) => state[MODULE_NAME].blog;
export const isLoading = (state) => state[MODULE_NAME].loading;

const initialState = {
  loading: false,
  blog: {},
  error: null,
};

// Reducer
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: payload,
        error: null,
      };
    case FETCH_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

// Actions
export const fetchBlogStart = () => ({
  type: FETCH_BLOG_START,
});

export const fetchBlogSuccess = (payload) => ({
  type: FETCH_BLOG_SUCCESS,
  payload: payload,
});

export const fetchBlogError = (payload) => ({
  type: FETCH_BLOG_ERROR,
  payload: payload,
});

// Middlewares
export const fetchBlog = (id) => {
  return (dispatch) => {
    dispatch(fetchBlogStart());
    const url = `${API_URL}/blogs/${id}`;
    fetch(url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchBlogSuccess(result));
        return result;
      })
      .catch((e) => dispatch(fetchBlogError(e)));
  };
};

function handleErrors(response) {
  //   console.log(`Response: ${JSON.stringify(response)}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
