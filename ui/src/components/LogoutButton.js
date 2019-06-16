import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import Client from "../Client"
import { withRouter } from 'react-router-dom';

class LoginButton extends Component {
    constructor(props) {
        super(props);
    }
 
    logout() {
        Client.sendForm(this.state, "/api/logout")
    }

    render() {
    return(
        <Button onClick={this.logout} color="teal">Logout</Button>
    )
  }
}

export default withRouter(LoginButton)
