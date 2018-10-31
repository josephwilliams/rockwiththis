export const STORE_KEY_CURRENT_SONG = 'currentSong'

const initialState = {
  isPlaying: false,
  activeSong: {
    better_featured_image: '',
    acf: {}
  },
  activeSongProgress: {
    played: 0,
    secondsPlayed: 0,
  },
}

export default (state = [], action) => {
  switch (action.type) {
    case 'app/FETCH_SINGLE_SONG': {
      return {
        ...state,
        singleSong: action.payload,
      };
    }
    case 'app/CLEAR_SINGLE_SONG': {
      return {
        ...state,
        singleSong: {},
      };
    }
    case 'app/SET_SONG_PROGRESS': {
      return {
        ...state,
        activeSongProgress: action.payload,
      };
    }
    case 'app/SET_SONG_DURATION': {
      return {
        ...state,
        activeSongDuration: action.payload,
      };
    }
    case 'app/SET_RELATED_SONGS': {
      return {
        ...state,
        relatedSongs: action.payload,
      };
    }
    case 'app/TOGGLE_PLAY_PAUSE': {
      return {
        ...state,
        isPlaying: action.payload,
      };
    }
    case 'app/TOGGLE_SONG': {
      return {
        ...state,
        activeSongDuration: { played: 0 },
        activeSong: action.payload,
      };
    }
    default:
      return state
  }
}
