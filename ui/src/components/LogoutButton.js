import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import Client from "../Client"
import { withRouter } from 'react-router-dom';

class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    logoutRedirect = () => {
        Client.sendForm(this.state, "/api/logout").then(json => {
            if(json.validate === "success") {
                this.props.setLoginFalse()
                this.props.history.push('/')
             } else {
                this.setState({failedLogin: true})
            }
        })
     }

    render() {
    return(
        <Button onClick={this.logoutRedirect} color="teal">Logout</Button>
    )
  }
}

export default withRouter(LoginButton)
