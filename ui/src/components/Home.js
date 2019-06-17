import React, {Component} from 'react';
import Attractions from './Attractions';

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
