import React, {Component} from 'react';
import Attraction from './Attraction'
import Client from '../Client.js'
import StackGrid from "react-stack-grid";

class Attractions extends Component {
    constructor(props) {
      super(props);
      this.state = {title: [1]};
    }
  
    async componentDidMount() {
      Client.getSummary(summary => {
        this.setState({
          title: JSON.parse(summary.content).attractions
        });
      });
    }
    async componentDidUpdate() {
      Client.getSummary(summary => {
        this.setState({
          title: JSON.parse(summary.content).attractions
        });
      });
    }
  
    render() {
      return (
        <div className="Attractions">
        <StackGrid columnWidth={300} gutterWidth={50} gutterHeight={0}>
          {this.state.title.filter(itm => true).map(item =>(
               <Attraction id={item.id} name={item.name} description={item.description} location={item.location} imageUrl={item.imageUrl}/>
          ))}
        </StackGrid>
        </div>
    );
    }
  }
  export default Attractions;
