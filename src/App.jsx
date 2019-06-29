import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Match from './Match';
import React from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/match" component={Match} />
        <Route path="/" component={Match} />
      </Switch>
    </BrowserRouter>
  );
}
