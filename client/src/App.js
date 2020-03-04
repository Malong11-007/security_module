import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationTable from './components/Application/ApplicationTable';
import ApplicationForm from './components/Application/ApplicationForm';
import './App.css';
import 'react-table-6/react-table.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Route that Displays Result and Edit Form */}
          <Route exact path="/application" component={ApplicationTable} />
          {/* Route For Check Insert Form will be merged in One */}
          <Route 
            path="/application/insert" 
            render={(props) => <ApplicationForm {...props} type="insert" />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
