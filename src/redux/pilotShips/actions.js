import * as SwapiService from '../../services/SwapiServices';

export const actionTypes = {
  FETCH_PILOT_SHIPS_REQUEST: 'FETCH_PILOT_SHIPS_REQUEST',
  FETCH_PILOT_SHIPS_SUCCESS: 'FETCH_PILOT_SHIPS_SUCCESS',
  FETCH_PILOT_SHIPS_ERROR: 'FETCH_PILOT_SHIPS_ERROR',
};

function loadPilotShipRequest() {
  return {
    type: actionTypes.FETCH_PILOT_SHIPS_REQUEST,
  };
}

function loadPilotShipsSuccess(results) {
  return {
    type: actionTypes.FETCH_PILOT_SHIPS_SUCCESS,
    data: results,
    error: null,
  };
}

function loadPilotShipsError(error) {
  return {
    type: actionTypes.FETCH_PILOT_SHIPS_ERROR,
    data: null,
    error: error,
  };
}

export const getPilotShips = (urls) => async (dispatch) => {
  dispatch(loadPilotShipRequest());
  try {
    const response = await Promise.all(
      urls.map((url) => {
        const query = url.split('starships/');
        return SwapiService.getShips(query[1]).then((res) => {
          return res.data;
        });
      }),
    );
    dispatch(loadPilotShipsSuccess(response));
  } catch (error) {
    dispatch(
      loadPilotShipsError('No pudimos obtener la lista de pilotos de la nave'),
    );
  }
};
