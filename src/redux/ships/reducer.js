import { actionTypes } from './actions';

const initialState = {
  ships: [],
  count: null,
  next: null,
};

function ships(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SHIPS_SUCCESS:
      return {
        ...state,
        ships: state.ships.concat(action?.data.results),
        count: action?.data.count,
        next: action?.data.next,
      };
    case actionTypes.FETCH_SHIPS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default ships;
