import React, {Component} from 'react';


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
        </div>
      );
    }
  }
  export default Profile;