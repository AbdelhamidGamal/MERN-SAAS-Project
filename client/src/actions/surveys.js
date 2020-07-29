import axios from 'axios';
import { fetchUser } from './auth';
import { FETCH_SURVEYS } from './types';

export function handleCreateSurvey(values, history) {
  return async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch(fetchUser(res.data));
    history.push('/surveys');
  };
}

function FetchSurveys(surveys) {
  return {
    type: FETCH_SURVEYS,
    surveys,
  };
}

export function handleFetchSurveys() {
  return async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch(FetchSurveys(res.data));
  };
}
