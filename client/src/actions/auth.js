import axios from 'axios';
import { FETCH_USER } from './types';

export function fetchUser(user) {
  return {
    type: FETCH_USER,
    user,
  };
}

export const handleFetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch(fetchUser(res.data));
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch(fetchUser(res.data));
};
