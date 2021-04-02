import './App.css';
import React, { Fragment } from 'react';
import Landing from './components/landing';
import Detail from './components/Detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Router>
        <Fragment>
          <Route exact path='/apps' component={Landing} />
          <Switch>
            <Route path='/apps/:id' render={(props) => <Detail {...props} />} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
