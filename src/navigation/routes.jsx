import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import AdminContainer from '../containers/admin';
import BracketContainer from '../containers/bracket';
import ContendersContainer from '../containers/contenders';


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={BracketContainer} />
      <Route path="/admin" component={AdminContainer} />
      <Route path="/contenders" component={ContendersContainer} />
    </Switch>
  );
}
