import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationTable from './components/Application/ApplicationTable';
import ApplicationForm from './components/Application/ApplicationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/application" component={ApplicationTable} />
          <Route 
            path="/application/insert" 
            render={(props) => <ApplicationForm {...props} type="insert" />}
          />
          <Route path="/application/edit/:id" component={ApplicationForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
