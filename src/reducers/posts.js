export const STORE_KEY_POSTS = 'posts';

const initialState = {
  posts: [],

  // deprecated
  featuredPosts: [],
  filteredPosts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'app/FETCH_POSTS': {
      return {
        ...state,
        posts: action.payload,
        filteredPosts: action.payload,
        activeSong: action.payload[0],
      };
    }
    case 'app/SET_REMAINING_POSTS': {
      return {
        ...state,
        filteredPosts: [
          ...state.posts,
          ...action.payload,
        ],
      };
    }
    case 'app/LOAD_MORE_SONGS': {
      return {
        ...state,
        filteredPosts: [
          ...state.filteredPosts,
          ...action.payload,
        ],
      };
    }
    case 'app/FETCH_CURRENT_REQUEST': {
      return {
        ...state,
        filteredPosts: action.payload,
      };
    }
    case 'app/CURRENT_REQUEST_LOADING': {
      return {
        ...state,
        currentRequestLoading: action.payload,
      };
    }
    default:
      return state
  }
}
