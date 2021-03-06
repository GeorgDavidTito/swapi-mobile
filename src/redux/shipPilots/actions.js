import * as SwapiService from '../../services/SwapiServices';

export const actionTypes = {
  FETCH_SHIP_PILOTS_REQUEST: 'FETCH_SHIP_PILOTS_REQUEST',
  FETCH_SHIP_PILOTS_SUCCESS: 'FETCH_SHIP_PILOTS_SUCCESS',
  FETCH_SHIP_PILOTS_ERROR: 'FETCH_SHIP_PILOTS_ERROR',
};

function loadShipPilotsRequest() {
  return {
    type: actionTypes.FETCH_SHIP_PILOTS_REQUEST,
  };
}

function loadShipPilotsSuccess(results) {
  return {
    type: actionTypes.FETCH_SHIP_PILOTS_SUCCESS,
    data: results,
    error: null,
  };
}

function loadShipPilotsError(error) {
  return {
    type: actionTypes.FETCH_SHIP_PILOTS_ERROR,
    data: null,
    error: error,
  };
}

export const getShipPilots = (urls) => async (dispatch) => {
  dispatch(loadShipPilotsRequest());
  try {
    const response = await Promise.all(
      urls.map((url) => {
        const query = url.split('people/');
        return SwapiService.getPilots(query[1]).then((res) => {
          return res.data;
        });
      }),
    );
    dispatch(loadShipPilotsSuccess(response));
  } catch (error) {
    dispatch(
      loadShipPilotsError('No pudimos obtener la lista de pilotos de la nave'),
    );
  }
};
