import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './components/Home.js'
import Profile from './components/Profile.js'
import NavBar from './components/NavBar'
import AttractionPage from './components/AttractionPage'

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
          <NavBar />
          <Route path="/attraction/:id" exact render={(props) => <AttractionPage {...props} data={this.state.data} comments= {new Map([[1,["Simar", "I hate this place bc I'm an anarchist uncle. If i could give this 0 stars i would", 1]], [4,["The Pope *", "Bruh my religion is the shit so sit tf down simar", 5]]])}/>} />
          <Route path="/" exact render={(props) => <Home {...props} data={this.state.data} />} />
          <Route path="/profile" exact render={(props) => <Profile {...props} data={this.state.data} />} />
          
        </div>
      </Router>
    );
  }
}
export default App;
