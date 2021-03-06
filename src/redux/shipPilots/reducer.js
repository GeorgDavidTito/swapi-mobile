import { actionTypes } from './actions';

const initialState = {
  shipPilots: [],
};

function shipPilots(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SHIP_PILOTS_SUCCESS:
      return {
        ...state,
        shipPilots: action?.data,
      };
    case actionTypes.FETCH_SHIP_PILOTS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default shipPilots;
