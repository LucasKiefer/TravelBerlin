import React, {Component} from 'react';
import Attraction from './Attraction'
import { Button } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Attractions extends Component {
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
        <div className="Attractions">
        <h1>Attarctions page</h1>
        {/* <Attraction /> */}
        <Button color="danger">Danger!</Button>
        </div>
    );
    }
  }
  export default Attractions;