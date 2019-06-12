import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Profile extends Component {
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
        <div className="Profile">
        <h1>Profile page</h1>
        <h2>Edit Profile:</h2>
        <form action="/name" method= "post">
          <label>
            Name:</label>
            <input type ="text" name="name" /><br></br>
            User Name:
            <input type ="text" name="userName" /><br></br>
            Password:
            <input type ="text" name="password" /><br></br>
        </form>
        </div>
    );
    }
  }
  export default Profile;