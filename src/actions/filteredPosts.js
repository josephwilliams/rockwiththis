const FETCH_FILTERS = {
  IN_PROGRESS: 'FETCH_FILTERS_IN_PROGRESS',
  SUCCESS: 'FETCH_FILTERS_SUCCESS',
  FAILURE: 'FETCH_FILTERS_FAILURE',
}

// this should be called fetchFilters
export const fetchFilteredPosts = tag => (dispatch, getState) => {
  dispatch({
    type: FETCH_FILTERS.IN_PROGRESS,
  })
  const dataURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?tags=54'

  fetch(dataURL).then(res => res.json()).then((res) => {
    dispatch({
      type: FETCH_FILTERS.SUCCESS,
      filters: res.tags,
    })
  }).catch((er) => {
    dispatch({
      type: FETCH_FILTERS.FAILURE,
    })
  })
}
