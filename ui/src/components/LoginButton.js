import React, {Component} from 'react'
import {Header, Modal, Button, Form} from 'semantic-ui-react'


class LoginButton extends Component {
    state = { open: false }
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
    const { open, dimmer } = this.state
    return(
        <Modal open={open} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Login</div>}>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' type="email" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type="password" />
                    </Form.Field>
                    <Button type='submit'>Login</Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default LoginButton