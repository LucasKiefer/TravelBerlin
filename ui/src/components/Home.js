import React, {Component} from 'react';
import Attractions from './Attractions';
import AttractionCreation from './AttractionCreation';
import NavBar from './NavBar';
import Attraction from "./Attraction";

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {title: '', isAdmin: true};
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
          {/* <NavBar></NavBar> */}
          <Attractions />
          {this.state.isAdmin && <AttractionCreation  />}
        </div>
    );
    }
  }
  export default Home;
