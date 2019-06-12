import React, {Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import LoginModal from './LoginModal'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const ModalExampleCloseIcon = () => (
  <Modal trigger={<Button>Show Modal</Button>} closeIcon>
    <Header icon='archive' content='Archive Old Messages' />
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red'>
        <Icon name='remove' /> No
      </Button>
      <Button color='green'>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

class LoginButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false
      };
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  
    render() {
      return (
        <LoginModal></LoginModal>
    );
    }
  }
  export default LoginButton;