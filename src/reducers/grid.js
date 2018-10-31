export const STORE_KEY_GRID = 'grid';

const initialState = {
  discoverLayout: 'expanded',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'app/CHANGE_GRID_VIEW': {
      return {
        ...state,
        discoverLayout: action.payload,
      };
    }
    default:
      return state
  }
}
