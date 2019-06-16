import React, {Component} from 'react';
import Attractions from './Attractions';
import AttractionCreation from './AttractionCreation';
import NavBar from './NavBar';
import Attraction from "./Attraction";

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
          <Attractions />
          
        </div>
    );
    }
  }
  export default Home;
