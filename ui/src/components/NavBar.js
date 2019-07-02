import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import LoginButton from './LoginButton.js'
import RegisterButton from './RegisterButton.js';
import { withRouter } from 'react-router-dom';
import Client from "../Client"
import LogoutButton from './LogoutButton'
import cookie from 'react-cookies'
import AttractionCreation from "./AttractionCreation";

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {"loggedin": false, "admin": false}
    this.setLoginTrue = this.setLoginTrue.bind(this)
    this.setLoginFalse = this.setLoginFalse.bind(this)
  }

  async componentDidMount() {
      Client.sendForm({}, '/api/user').then(usr => {
        console.log(usr.user)
          if (usr.user === "Not logged in") {
            this.setState({loggedin: false})
          } else {
            this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin})
          }

        }
      ).catch(console.log)
    }

  setLoginTrue() {
    Client.sendForm({}, '/api/user').then(usr => {
      console.log(usr.user)
        if (usr.user === "Not logged in") {
          this.setState({loggedin: false})
        } else {
          this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin})
        }

      }
    )
  }

  setLoginFalse() {
      Client.sendForm({}, '/api/user').then(usr => {
        console.log(usr.user)
          if (usr.user === "Not logged in") {
            this.setState({loggedin: false})
          } else {
            this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin})
          }

        }
    )
  }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/')
  }

  render() {
    const { activeItem } = this.state
    let upperRight;
    if(this.state.loggedin) {
      if(this.state.admin) {
        upperRight = <div> <AttractionCreation/> <Button onClick={() => {
          this.props.history.push('/profile')
        }}>Profile</Button><LogoutButton setLoginFalse={this.setLoginFalse}></LogoutButton></div>
      } else {
        upperRight = <div> <Button onClick={() => {
          this.props.history.push('/profile')
        }}>Profile</Button><LogoutButton setLoginFalse={this.setLoginFalse}></LogoutButton></div>
      }

    } else {
        upperRight = <div><RegisterButton setLoginTrue = {this.setLoginTrue} ></RegisterButton><LoginButton setLoginTrue = {this.setLoginTrue}></LoginButton></div>
    }
    return (
      <Menu>
        <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>
          Home
        </Menu.Item>

        <Menu.Menu position='right'>


            {/* <RegisterButton></RegisterButton>
            <LoginButton></LoginButton> */}
            {upperRight}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(NavBar)
