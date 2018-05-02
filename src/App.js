import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './routes/LoginPage';
import Index from './routes/Index/Index';
import DetailOpinion from './routes/DetailOpinion/DetailOpinion';
class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route path="/detail" component={DetailOpinion}/>
              <Route path="/" component={Index} />
            </Switch>
        </Router>
    )
  }
}
export default App;