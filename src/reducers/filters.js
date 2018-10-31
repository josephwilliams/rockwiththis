import { FETCH_FILTERS } from '../actions/filters'


export const STORE_KEY_FILTERS = 'filters'

const initialState = {
  filters: [],
  selectedFilters: [],
}

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FILTERS.SUCCESS:
      return action.filters
    case 'app/FETCH_FILTERS': {
      return {
        ...state,
        filters: action.payload.tags,
      };
    }
    case 'app/TOGGLE_FILTER': {
      const filters = state.filters
      filters[action.payload.i].selected = !filters[action.payload.i].selected
      const selectedFilters = filters.filter(filter => filter.selected === true)
      return {
        ...state,
        selectedFilters: selectedFilters,
      };
    }
    case 'app/CLEAR_FILTERS': {
      const filters = state.filters.map(filter => {
        filter.selected = false
        return filter
      })
      return {
        ...state,
        filters: filters,
        selectedFilters: [],
        filteredPosts: state.posts,
      };
    }
    default:
      return state
  }
}
