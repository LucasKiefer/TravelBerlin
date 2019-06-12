import React, {Component} from 'react';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import Attractions from './Attractions'

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
          <Attractions />
        </div>
    );
    }
  }
  export default Home;