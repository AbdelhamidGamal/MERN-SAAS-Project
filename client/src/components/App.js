import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h1>Dashboard</h1>;
const SurveyNew = () => <h1>SurveyNew</h1>;

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
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
