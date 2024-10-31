const API_URL = process.env.REACT_APP_API_URL;
// console.log(`CURRENT API URL ${API_URL}`);

// Actions
const FETCH_BLOGS_START = "FETCH_BLOGS_START";
const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
const FETCH_BLOGS_ERROR = "FETCH_BLOGS_ERROR";

const POST_BLOG_START = "POST_BLOG_START";
const POST_BLOG_SUCCESS = "POST_BLOG_SUCCESS";
const POST_BLOG_ERROR = "POST_BLOG_ERROR";

const DELETE_BLOG_START = "DELETE_BLOG_START";
const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";
const DELETE_BLOG_ERROR = "DELETE_BLOG_ERROR";

export const MODULE_NAME = "blogs";
export const getBlogs = (state) => state[MODULE_NAME].blogs;
export const isLoading = (state) => state[MODULE_NAME].loading;

export const getDeleteBlogPending = (state) =>
  state[MODULE_NAME].deleteBlogPending;
export const getDeleteBlogError = (state) => state[MODULE_NAME].deleteBlogError;
export const getDeleteBlogSuccess = (state) =>
  state[MODULE_NAME].deleteBlogSuccess;

const initialState = {
  loading: false,
  blogs: [],
  error: null,
  deleteBlogPending: false,
  deleteBlogError: null,
  deleteBlogSuccess: null,
};

// Reducer
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BLOGS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: payload,
        error: null,
      };
    case FETCH_BLOGS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_BLOG_START:
      return {
        ...state,
        error: null,
      };
    case POST_BLOG_SUCCESS:
      return {
        ...state,
        posted: true,
        error: null,
      };
    case POST_BLOG_ERROR:
      return {
        ...state,
        posted: false,
        error: payload,
      };
    case DELETE_BLOG_START:
      return {
        ...state,
        deleteBlogPending: true,
        deleteBlogError: null,
        deleteBlogSuccess: null,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        deleteBlogPending: false,
        deleteBlogError: null,
        deleteBlogSuccess: payload,
      };
    case DELETE_BLOG_ERROR:
      return {
        ...state,
        deleteBlogPending: false,
        deleteBlogError: payload,
        deleteBlogSuccess: null,
      };
    default:
      return state;
  }
};

// Actions
export const fetchBlogsStart = () => ({
  type: FETCH_BLOGS_START,
});

export const fetchBlogsSuccess = (payload) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: payload,
});

export const fetchBlogsError = (payload) => ({
  type: FETCH_BLOGS_ERROR,
  payload: payload,
});

// Post blog
export const postBlogStart = () => ({
  type: POST_BLOG_START,
});

export const postBlogSuccess = (payload) => ({
  type: POST_BLOG_SUCCESS,
  payload: payload,
});

export const postBlogError = (payload) => ({
  type: POST_BLOG_ERROR,
  payload: payload,
});

export const deleteBlogStart = () => ({
  type: DELETE_BLOG_START,
});

export const deleteBlogSuccess = (payload) => ({
  type: DELETE_BLOG_SUCCESS,
  payload: payload,
});

export const deleteBlogError = (payload) => ({
  type: DELETE_BLOG_ERROR,
  payload: payload,
});

// Middlewares
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchBlogs = (order) => {
  return (dispatch) => {
    dispatch(fetchBlogsStart());
    fetch(`${API_URL}/blogs/${order}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        // console.log(`Fetched blogs: ${JSON.stringify(result[0].postDate)}`);
        dispatch(fetchBlogsSuccess(result));
        return result;
      })
      .catch((e) => dispatch(fetchBlogsError(e)));
  };
};

export const postBlog = (blog) => {
  return (dispatch) => {
    dispatch(postBlogStart());
    fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then(handleErrors)
      .then((result) => {
        // console.log(`Post result: ${JSON.stringify(result)}`);
        dispatch(postBlogSuccess(result));
        return result;
      })
      .catch((e) => dispatch(postBlogError(e)));
  };
};

export const deleteBlog = (id) => {
  return (dispatch) => {
    dispatch(deleteBlogStart());
    fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        console.log(`Delete result: ${JSON.stringify(result)}`);
        dispatch(deleteBlogSuccess(result));
        return result;
      })
      .catch((e) => dispatch(deleteBlogError(e)));
  };
};

export const increaseView = (id) => {
  fetch(`${API_URL}/blogs/view/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((result) => {
      // console.log(`View count increased: ${result.views}`);
    })
    .catch((e) => console.log(e.message));
};
