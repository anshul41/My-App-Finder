import './App.css';
import React, { Fragment } from 'react';
import Landing from './components/landing';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className='App container'>
      <Router>
        <Navbar />
        <Fragment>          
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/apps/:id' render={(props) => <Detail {...props} />} />
          </Switch>
        </Fragment>
        <Navbar footer={true}/>
      </Router>
    </div>
  );
}

export default App;
