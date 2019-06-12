import React, {Component} from 'react';
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
          <h1>Home page</h1>
          <p>Login:</p>
          <form action="/login" method="post">
            <label>
              User Name:</label>
              <input type="text" name="userName" /><br></br>
              Password:
              <input type="password" name="password"/><br></br>
            <input type="submit" value="Login" />
          </form>

          <p>Register:</p>
          <form>
            <label>First Name:</label>
            <input type="text" name="firstName" /><br></br>
             Last Name:
            <input type="text" name="lastName" /><br></br>
            User Name:
            <input type="text" name="userName" /><br></br>
            Email:
            <input type="text" name="email" /><br></br>
            
            <input type="submit" value="Register"/>
          </form>
        </div>
    );
    }
  }
  export default Home;