import api from '../config/api';

export const getShips = async () => api.get('/starships/');
