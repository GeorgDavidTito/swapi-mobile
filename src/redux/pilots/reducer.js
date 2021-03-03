import { actionTypes } from './actions';

const initialState = {
  pilots: [],
  count: null,
  next: null,
};

function pilots(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PILOTS_SUCCESS:
      return {
        ...state,
        pilots: state.pilots.concat(
          action?.data.results.filter((pilot) => pilot?.starships?.length > 0),
        ),
        count: action?.data.count,
        next: action?.data.next,
      };
    case actionTypes.FETCH_PILOTS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default pilots;
