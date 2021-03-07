import { actionTypes } from './actions';

const initialState = {
  films: [],
  count: null,
  next: null,
};

function films(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_FILMS_RESET:
      return {
        ...state,
        films: [],
      };
    case actionTypes.FETCH_FILMS_SUCCESS:
      return {
        ...state,
        films: state.films.concat(action?.data.results),
        count: action?.data.count,
        next: action?.data.next,
      };
    case actionTypes.FETCH_FILMS_ERROR:
      return { ...state };
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        films: action?.data,
      };
    case actionTypes.FETCH_SEARCH_ERROR:
      return { ...state, searchSuccess: null };
    default:
      return state;
  }
}

export default films;
