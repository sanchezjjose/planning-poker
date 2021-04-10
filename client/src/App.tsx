import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Poll from './components/Poll';
import Landing from './components/Landing';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/:id">
            <Poll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
