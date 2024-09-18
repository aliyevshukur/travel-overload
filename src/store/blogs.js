// Actions
const FETCH_BLOGS_START = "FETCH_BLOGS_START";
const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
const FETCH_BLOGS_ERROR = "FETCH_BLOGS_ERROR";
const POST_BLOG_START = "POST_BLOG_START";
const POST_BLOG_SUCCESS = "POST_BLOG_SUCCESS";
const POST_BLOG_ERROR = "POST_BLOG_ERROR";

export const MODULE_NAME = "blogs";

export const getBlogs = (state) => state[MODULE_NAME].blogs;
export const isLoading = (state) => state[MODULE_NAME].loading;

const initialState = {
  loading: false,
  blogs: [],
  error: null,
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

// Middlewares
export const fetchBlogs = () => {
  return (dispatch) => {
    dispatch(fetchBlogsStart());
    const url = "https://travl-overload-server.vercel.app/blogs";
    fetch(url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        dispatch(fetchBlogsSuccess(result));
        return result;
      })
      .catch((e) => dispatch(fetchBlogsError(e)));

    //Return fake data
    // dispatch(fetchBlogsSuccess(fakeBlogData));
    // return fakeBlogData;
  };
};

export const postBlog = (blog) => {
  return (dispatch) => {
    dispatch(postBlogStart());
    const url = "https://travl-overload-server.vercel.app/blogs";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then(handleErrors)
      .then((result) => {
        console.log(`Post result: ${JSON.stringify(result)}`);
        dispatch(postBlogSuccess(result));
        return result;
      })
      .catch((e) => dispatch(postBlogError(e)));
  };
};

function handleErrors(response) {
  // console.log(`Response: ${JSON.stringify(response)}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
