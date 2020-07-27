import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import Thanks from './Thanks';

const Dashboard = () => <h1>Dashboard</h1>;

const App = ({ handleFetchUser }) => {
  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route exact path='/surveys/new' component={SurveyNew} />
        <Route path='/surveys/thanks' component={Thanks} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
