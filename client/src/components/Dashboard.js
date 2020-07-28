import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

async function handleFetchSurveys() {
  const res = await axios.get('/api/surveys');
  return res.data;
}

function Dashboard() {
  const [surveys, setSurveys] = useState(false);

  useEffect(() => {
    handleFetchSurveys().then((surveys) => setSurveys(surveys));
  }, []);

  return (
    <div className='container'>
      <div>
        <button className='btn white-text blue'>
          <Link className='white-text' to='/surveys/new'>
            Create A Survey
          </Link>
        </button>
      </div>
      {surveys &&
        surveys.map((survey) => {
          return (
            <div key={survey._id}>
              <div className='col s12 m6'>
                <div className='card grey darken-1'>
                  <div className='card-content white-text'>
                    <span className='card-title'>{survey.title}</span>
                    <p>{new Date(survey.dataSent).toDateString()}</p>
                    <p>Yes : {survey.yes}</p>
                    <p>no : {survey.no}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Dashboard;
