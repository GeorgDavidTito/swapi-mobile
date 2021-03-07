import * as SwapiService from '../../services/SwapiServices';

export const actionTypes = {
  FETCH_FILMS_REQUEST: 'FETCH_FILMS_REQUEST',
  FETCH_FILMS_SUCCESS: 'FETCH_FILMS_SUCCESS',
  FETCH_FILMS_ERROR: 'FETCH_FILMS_ERROR',

  FETCH_SEARCH_REQUEST: 'FETCH_SEARCH_REQUEST',
  FETCH_SEARCH_SUCCESS: 'FETCH_SEARCH_SUCCESS',
  FETCH_SEARCH_ERROR: 'FETCH_SEARCH_ERROR',

  FETCH_FILMS_RESET: 'FETCH_FILMS_RESET',
};

function loadFilmsRequest() {
  return {
    type: actionTypes.FETCH_FILMS_REQUEST,
  };
}

function loadFilmsSuccess(results) {
  return {
    type: actionTypes.FETCH_FILMS_SUCCESS,
    data: results,
    error: null,
  };
}

function loadFilmsError(error) {
  return {
    type: actionTypes.FETCH_FILMS_ERROR,
    data: null,
    error: error,
  };
}
function loadFilmsReset() {
  return {
    type: actionTypes.FETCH_FILMS_RESET,
    data: [],
    error: null,
  };
}

function loadSearchRequest() {
  return {
    type: actionTypes.FETCH_SEARCH_REQUEST,
  };
}

function loadSearchSuccess(results) {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    data: results,
    error: null,
  };
}

function loadSearchError(error) {
  return {
    type: actionTypes.FETCH_SEARCH_ERROR,
    data: null,
    error: error,
  };
}

export const getFilms = (query) => async (dispatch) => {
  dispatch(loadFilmsRequest());
  try {
    const response = await SwapiService.getFilms(query);
    if (response.status === 200) {
      dispatch(loadFilmsSuccess(response?.data));
    } else {
      dispatch(loadFilmsError(response.error));
    }
  } catch (error) {
    dispatch(loadFilmsError('No pudimos obtener la lista de pilotos'));
  }
};

export const getSearch = (query) => async (dispatch) => {
  dispatch(loadSearchRequest());
  try {

    const response = await SwapiService.getPilots(query);
    if (response.status === 200 && response.data.count > 0) {
      const responseFilms = await Promise.all(
        response.data?.results[0].films.map((url) => {
          const query = url.split('films/');
          return SwapiService.getFilms(query[1]).then((res) => {
            return res.data;
          });
        }),
      );
      await dispatch(loadSearchSuccess(responseFilms));
    } else if (response.status === 200 && response.data.count === 0) {
      const responseShip = await SwapiService.getShips(query);
      if (responseShip.status === 200 && responseShip.data?.count > 0) {
        const responseFilms = await Promise.all(
          responseShip.data?.results[0].films.map((url) => {
            const query = url.split('films/');
            return SwapiService.getFilms(query[1]).then((res) => {
              return res.data;
            });
          }),
        );
        await dispatch(loadSearchSuccess(responseFilms));
      } else {
        dispatch(loadFilmsReset());
      }
    } else {
      dispatch(loadFilmsReset());
      dispatch(loadSearchError(response.error));
    }
  } catch (error) {
    dispatch(
      loadSearchError('No pudimos obtener la lista de peliculas'),
    );
  }
};

export const resetFilms = () => async (dispatch) => {
  await dispatch(loadFilmsReset());
  dispatch(getFilms());
};
