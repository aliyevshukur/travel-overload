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

const fakeBlogData = [
  {
    context: " blajglkasjfkdsjfdkfjsdkfj",
    image:
      "https://images.unsplash.com/photo-1725576415790-a5b4009a7952?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "bla bla",
    postDate: "12-12-2002",
    author: " Blaa BLaa",
    authorImage:
      "https://plus.unsplash.com/premium_photo-1725655699491-d69418b09381?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    context: " blajglkasjfkdsjfdkfjsdkfj",
    image:
      "https://images.unsplash.com/photo-1725576415790-a5b4009a7952?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "bla bla",
    postDate: "12-12-2002",
    author: " Blaa BLaa",
    authorImage:
      "https://plus.unsplash.com/premium_photo-1725655699491-d69418b09381?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    context: " blajglkasjfkdsjfdkfjsdkfj",
    image:
      "https://images.unsplash.com/photo-1725576415790-a5b4009a7952?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "bla bla",
    postDate: "12-12-2002",
    author: " Blaa BLaa",
    authorImage:
      "https://plus.unsplash.com/premium_photo-1725655699491-d69418b09381?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
        dispatch(postBlogSuccess(result));
        return result;
      })
      .catch((e) => dispatch(fetchBlogsError(e)));

    //Return fake data
    // dispatch(fetchBlogsSuccess(fakeBlogData));
    // return fakeBlogData;
  };
};

function handleErrors(response) {
  console.log(`Response: ${response}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
