import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Quiz from './Pages/Quiz';
import './App.css';

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={Quiz} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
