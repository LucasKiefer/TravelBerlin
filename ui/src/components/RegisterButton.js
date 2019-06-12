import React, {Component} from 'react'
import {Modal, Button, Form, Checkbox} from 'semantic-ui-react'


class RegisterButton extends Component {
    state = { open: false, needed: true }
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
                    <Form.Group widths='equal'>
                        <Form.Input required fluid label='First name' placeholder='First name' />
                        <Form.Input required fluid label='Last name' placeholder='Last name' />
                    </Form.Group>
                    <Form.Field>
                        <Form.Input required fluid label='Email' placeholder='Email' type='email' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input required fluid label='Password' placeholder='Password' type="password" />
                    </Form.Field>
                    <Form.Field control={Checkbox} label='Register as Admin'/>
                    <Form.Input fluid label='Admin Password' placeholder='Admin Password' type="password" />
                    <Form.Button type='submit'>Register</Form.Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default RegisterButton