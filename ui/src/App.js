import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './components/Home.js'
import Profile from './components/Profile.js'
import Attractions from './components/Attractions'
import Attraction from './components/Attraction'

import Client from "./Client";
import './App.css';

// const Tech = ({ match }) => {
//   return <div>Current Route: {match.params.tech}</div>
//};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  async componentDidMount() {
    Client.getSummary(summary => {
      this.setState({
        title: summary.content
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Route path="/:tech" component={Tech} /> */}
          <Route path="/" exact render={(props) => <Home {...props} data={this.state.data} />} />
          <Route path="/profile" exact render={(props) => <Profile {...props} data={this.state.data} />} />
        </div>
      </Router>
    );
  }
}
export default App;
