import { actionTypes } from './actions';

const initialState = {
  pilotShips: [],
};

function pilotShips(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PILOT_SHIPS_SUCCESS:
      return {
        ...state,
        pilotShips: action?.data,
      };
    case actionTypes.FETCH_PILOT_SHIPS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default pilotShips;
