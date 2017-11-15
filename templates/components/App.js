import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store';
import { Provider } from 'react-redux';
import AuthorizedRoute from '../utils/AuthorizedRoute';

import '../styles/main.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router> 
          <Switch>
            <Route exact path="/" component={()=>(<div/>)}/>
            <AuthorizedRoute exact path="/authorized" component={()=>(<div/>)}/>
            <Route render={() => <h1>404 - Undefined route</h1>}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
