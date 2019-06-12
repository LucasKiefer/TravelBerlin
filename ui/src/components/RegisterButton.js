import React, {Component} from 'react'
import {Header, Modal, Button, Form} from 'semantic-ui-react'


class LoginButton extends Component {
    state = { open: false }
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
    const { open, dimmer } = this.state
    return(
        <Modal open={open} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Register</div>}>
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>User Name</label>
                        <input placeholder='User Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type="email" />
                    </Form.Field>
                    <Button type='submit'>Register</Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default LoginButton