import * as SwapiService from '../../services/SwapiServices';

export const actionTypes = {
  FETCH_SHIPS_REQUEST: 'FETCH_SHIPS_REQUEST',
  FETCH_SHIPS_SUCCESS: 'FETCH_SHIPS_SUCCESS',
  FETCH_SHIPS_ERROR: 'FETCH_SHIPS_ERROR',
};

function loadShipsRequest() {
  return {
    type: actionTypes.FETCH_SHIPS_REQUEST,
  };
}

function loadShipsSuccess(results) {
  return {
    type: actionTypes.FETCH_SHIPS_SUCCESS,
    data: results,
    error: null,
  };
}

function loadShipsError(error) {
  return {
    type: actionTypes.FETCH_SHIPS_ERROR,
    data: null,
    error: error,
  };
}

export const getShips = () => async (dispatch) => {
  dispatch(loadShipsRequest());
  try {
    const response = await SwapiService.getShips();
    if (response.status === 200) {
      dispatch(loadShipsSuccess(response?.data));
    } else {
      dispatch(loadShipsError(response.error));
    }
  } catch (error) {
    dispatch(loadShipsError('No pudimos obtener la lista de naves'));
  }
};
