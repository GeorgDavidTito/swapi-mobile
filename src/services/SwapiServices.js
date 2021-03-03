import api from '../config/api';

export const getShips = async (query = '') => api.get(`starships/${query}`);

export const getPilots = async (query = '') => api.get(`people/${query}`);
