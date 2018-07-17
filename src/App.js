import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './routes/LoginPage';
import Index from './routes/Index/Index';
import DetailOpinion from './routes/DetailOpinion/DetailOpinion';
import MulOpinion from './routes/Multilingual/MulOpinion/MulOpinion'
import BiddingOpinion from './routes/BiddingOpinion/Biddingpinion/Biddingpinion'
import AppCenter from './routes/AppCenter/AppCenter'
class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route path="/detail" component={DetailOpinion}/>
              <Route path="/multilingual/detail/:sid/:languages/:param" component={MulOpinion}/>
              <Route path="/multilingual/detail/" component={BiddingOpinion}/>
              <Route path="/appcenter" component={AppCenter}/>
              <Route path="/" component={Index} />
            </Switch>
        </Router>
    )
  }
}
export default App;
