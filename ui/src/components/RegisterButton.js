import React, {Component} from 'react'
import {Modal, Form, Checkbox} from 'semantic-ui-react'


class RegisterButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, isChecked: false};
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    show = dimmer => () => this.setState({ dimmer, open: true})
    close = () => this.setState({ open: false })
    handleChecked = (events) => {
        this.setState({isChecked: !this.state.isChecked})
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('/register', {
          method: 'POST',
          body: data,
        });
      }

    render() {
    const { open } = this.state
    return(
        <Modal open={open} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Register</div>}>
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
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
                    <Form.Field control={Checkbox} onChange={this.handleChecked} label='Register as Admin'/>
                    {this.state.isChecked && <Form.Input fluid label='Admin Password' placeholder='Admin Password' type="password" />}
                    <Form.Button type='submit'>Register</Form.Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default RegisterButton