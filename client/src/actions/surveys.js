import axios from 'axios';
import { fetchUser } from './auth';

export function handleCreateSurvey(values, history) {
  return async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch(fetchUser(res.data));
    history.push('/surveys');
  };
}
