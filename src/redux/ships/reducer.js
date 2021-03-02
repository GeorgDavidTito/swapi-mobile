import { actionTypes } from './actions';

const initialState = {
  ships: [],
};

function ships(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SHIPS_SUCCESS:
      return {
        ...state,
        ships: action?.data,
      };
    case actionTypes.FETCH_SHIPS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default ships;
