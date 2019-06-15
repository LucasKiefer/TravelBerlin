import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import LoginButton from './LoginButton.js'
import RegisterButton from './RegisterButton.js';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {"loggedin": false}
    this.setLoginTrue = this.setLoginTrue.bind(this)
  }

  setLoginTrue() {
      this.setState({
          "loggedin": true
      })
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    let upperRight;
    if(this.state.loggedin) {
        upperRight = <Button onClick={() => this.props.history.push('/profile')}>Profile</Button>
    } else {
        upperRight = <div><RegisterButton setLoginTrue = {this.setLoginTrue} ></RegisterButton><LoginButton setLoginTrue = {this.setLoginTrue}></LoginButton></div>
    }
    return (
      <Menu>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Browse
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>


            {/* <RegisterButton></RegisterButton>
            <LoginButton></LoginButton> */}
            {upperRight}

            <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
                Help
            </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(NavBar)