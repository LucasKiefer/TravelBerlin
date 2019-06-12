import React, {Component} from 'react';
import Attraction from './Attraction'
import { Button } from 'semantic-ui-react';
import Client from '../Client.js'
import StackGrid from "react-stack-grid";

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Attractions extends Component {
    constructor(props) {
      super(props);
      this.state = {title: {}};
    }
  
    async componentDidMount() {
      Client.getSummary(summary => {
        this.setState({
          title: JSON.parse(summary.content)
        });
        console.log(summary.content.description);
      });
    }
  
    render() {
      return (
        <div className="Attractions">
        <h1>Attarctions page</h1>
        <Attraction name={this.state.title.name} description={this.state.title.description} location={this.state.title.location}/>
        {/* <StackGrid columnWidth={300} gutterWidth={50}>
          {this.state.title.map(item =>(
               
          ))}
        </StackGrid> */}
        <Button color="red">Danger!</Button>
        </div>
    );
    }
  }
  export default Attractions;