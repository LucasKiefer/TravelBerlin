import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Attraction extends React.Component {
    render() {
        return(
            <div id="blk">
                <img alt="Missing Pic" src={this.props.imgurl}></img>
                {/* <p id="date">{this.props.date}</p> */}
                <h5><b>{this.props.title}</b></h5>
                <p id="description">{this.props.description}</p>
            </div>
        )
    }
}

export default Attraction;