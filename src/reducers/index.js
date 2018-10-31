import { combineReducers } from 'redux'
import { FETCH_POSTS } from 'actions/index'
import { FETCH_FEATURED_POSTS } from 'actions/featuredPosts'
import { FETCH_FILTERS } from 'actions/filters'
import { FETCH_RELATED_SONGS } from 'actions/relatedSongs'
import posts from 'reducers/posts'
import featuredPosts from 'reducers/featuredPosts'
import queue from 'reducers/queue'
import relatedSongs from 'reducers/relatedSongs'
import filters from 'reducers/filters'
import update from 'react-addons-update'
import { handleActions } from 'redux-actions'

import appReducerPosts, { STORE_KEY_POSTS } from 'reducers/posts'
import appReducerCurrentSong, { STORE_KEY_CURRENT_SONG } from 'reducers/currentSong'
import appReducerFilters, { STORE_KEY_FILTERS } from 'reducers/filters'
import appReducerGrid, { STORE_KEY_GRID } from 'reducers/grid'

// import appReducerAuth, { STORE_KEY_AUTH } from 'reducers/auth'

// const appReducers = handleActions({
//   'app/FETCH_POSTS': (state, action) => {
//     return update(state, {
//       posts: { $set: action.payload },
//       filteredPosts: { $set: action.payload },
//       activeSong: { $set: action.payload[0] },
//     })
//   },
//   'app/SET_REMAINING_POSTS': (state, action) => {
//     return update(state, {
//       filteredPosts: { $set: [...state.posts, ...action.payload] }
//     })
//   },
//   'app/FETCH_CURRENT_REQUEST': (state, action) => {
//     return update(state, {
//       filteredPosts: { $set: action.payload }
//     })
//   },
//   'app/CURRENT_REQUEST_LOADING': (state, action) => {
//     return update(state, {
//       currentRequestLoading: { $set: action.payload }
//     })
//   },
//   'app/LOAD_MORE_SONGS': (state, action) => {
//     return update(state, {
//       filteredPosts: { $set: [...state.filteredPosts, ...action.payload]}
//     })
//   },
//   'app/FETCH_SINGLE_SONG': (state, action) => {
//     return update(state, {
//       singleSong: { $set: action.payload }
//     })
//   },
//   'app/CLEAR_SINGLE_SONG': (state, action) => {
//     return update(state, {
//       singleSong: { $set: {} }
//     })
//   },
//   'app/SET_SONG_PROGRESS': (state, action) => {
//     return update(state, {
//       activeSongProgress: { $set: action.payload }
//     })
//   },
//   'app/SET_SONG_DURATION': (state, action) => {
//     return update(state, {
//       activeSongDuration: { $set: action.payload }
//     })
//   },
//   'app/SET_RELATED_SONGS': (state, action) => {
//     return update(state, {
//       relatedSongs: { $set: action.payload }
//     })
//   },
//   'app/TOGGLE_PLAY_PAUSE': (state, action) => {
//     return update(state, {
//       isPlaying: { $set: action.payload}
//     })
//   },
//   'app/TOGGLE_SONG': (state, action) => {
//     return update(state, {
//       activeSongDuration: { $set: { played: 0 } },
//       activeSong: { $set: action.payload }
//     })
//   },
//   'app/CHANGE_GRID_VIEW': (state, action) => {
//     return update(state, {
//       discoverLayout: { $set: action.payload }
//     })
//   },
//   'app/FETCH_FILTERS': (state, action) => {
//     return update(state, {
//       filters: { $set: action.payload.tags }
//     })
//   },
//   'app/TOGGLE_FILTER': (state, action) => {
//     const filters = state.filters
//     filters[action.payload.i].selected = !filters[action.payload.i].selected
//     const selectedFilters = filters.filter(filter => filter.selected === true)
//     return update(state, {
//       filters: { $set: filters },
//       selectedFilters: { $set: selectedFilters }
//     })
//   },
//   'app/CLEAR_FILTERS': (state, action) => {
//     const filters = state.filters.map(filter => {
//       filter.selected = false
//       return filter
//     })
//     return update(state, {
//       filters: { $set: filters },
//       filteredPosts: { $set: state.posts },
//       selectedFilters: { $set: [] }
//     })
//   }
// }, INITIAL_STATE)


/**
 * Ensures the integrity of 'reducersToCombine'.
 *
 * @param  {Array}  reducersToCombine  Array of reducers to check.
 * @return {Array}                     The original 'reducersToCombine' array
 */
const sanityChecks = (reducersToCombine) => {
  if (process.env.NODE_ENV === 'development') {
    if (reducersToCombine['undefined']) {
      throw new Error(
        'Got "undefined" key in `reducersToCombine`, ensure `STORE_KEY` for ' +
        String(reducersToCombine['undefined'])
      );
    }
    Object.keys(reducersToCombine).forEach((key) => {
      if (typeof reducersToCombine[key] !== 'function') {
        throw new Error(
          `Got ${typeof reducersToCombine[key]} in 'reducersToCombine', ` +
          `ensure a reducer function at "${key}" key.`);
      }
    });
  }

  return reducersToCombine;
};

const reducersToCombine = {
  [STORE_KEY_POSTS]: appReducerPosts,
  [STORE_KEY_CURRENT_SONG]: appReducerCurrentSong,
  [STORE_KEY_FILTERS]: appReducerFilters,
  [STORE_KEY_GRID]: appReducerGrid,
}

const combinedReducer = combineReducers(sanityChecks(reducersToCombine));

function rootReducer(state = {}, action) {
  let nextState = state

  // Transform the state with all the reducers combined into a single function.
  nextState = combinedReducer(nextState, action)

  return nextState
}

export default rootReducer
