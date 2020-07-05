import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST_LIKES,
  UPDATE_POST_UNLIKES,
  UPDATE_POST_SAVES,
  UPDATE_POST_UNSAVES,
  ADD_POST_COMMENT,
  REMOVE_POST_COMMENT
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  liked: false,
  saved: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, liked: true }
            : post
        ),
        loading: false
      };
    case UPDATE_POST_UNLIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, liked: false }
            : post
        ),
        loading: false
      };
    case UPDATE_POST_SAVES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? { ...post, saves: payload.saves, saved: true }
            : post
        ),
        loading: false
      };
    case UPDATE_POST_UNSAVES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? { ...post, saves: payload.saves, saved: false }
            : post
        ),
        loading: false
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_POST_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
