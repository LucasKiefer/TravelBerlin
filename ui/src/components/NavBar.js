import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import LoginButton from './LoginButton.js'
import RegisterButton from './RegisterButton.js';

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Browse
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>
            <RegisterButton></RegisterButton>
            <LoginButton></LoginButton>

            <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
                Help
            </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}