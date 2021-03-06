import * as SwapiService from '../../services/SwapiServices';

export const actionTypes = {
  FETCH_PILOTS_REQUEST: 'FETCH_PILOTS_REQUEST',
  FETCH_PILOTS_SUCCESS: 'FETCH_PILOTS_SUCCESS',
  FETCH_PILOTS_ERROR: 'FETCH_PILOTS_ERROR',
};

function loadPilotsRequest() {
  return {
    type: actionTypes.FETCH_PILOTS_REQUEST,
  };
}

function loadPilotsSuccess(results) {
  return {
    type: actionTypes.FETCH_PILOTS_SUCCESS,
    data: results,
    error: null,
  };
}

function loadPilotsError(error) {
  return {
    type: actionTypes.FETCH_PILOTS_ERROR,
    data: null,
    error: error,
  };
}

export const getPilots = query => async (dispatch) => {
  dispatch(loadPilotsRequest());
  try {
    const response = await SwapiService.getPilots(query);
    if (response.status === 200) {
      dispatch(loadPilotsSuccess(response?.data));
    } else {
      dispatch(loadPilotsError(response.error));
    }
  } catch (error) {
    dispatch(loadPilotsError('No pudimos obtener la lista de pilotos'));
  }
};
