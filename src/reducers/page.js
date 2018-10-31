import { FETCH_POSTS } from 'actions/index'

const initialState = {
  currentlyFetchedPageNumber: 0,
}

const currentlyFetchedPageNumber = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_POSTS.SUCCESS:
    return action.pageNumber + 1
  default:
    return state
  }
}

export default currentlyFetchedPageNumber;
