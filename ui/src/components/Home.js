import React, {Component} from 'react';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {title: ''};
    }
  
    // async componentDidMount() {
    //   Client.getSummary(summary => {
    //     this.setState({
    //       title: summary.content
    //     });
    //   });
    // }
  
    render() {
      return (
        <div className="Home">
          <LoginButton></LoginButton>
          <RegisterButton></RegisterButton>
        </div>
    );
    }
  }
  export default Home;