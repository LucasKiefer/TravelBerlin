import React, {Component} from 'react'
import {Modal, Form, Checkbox, Message} from 'semantic-ui-react'
import Client from '../Client'
import  { Redirect } from 'react-router-dom'
import { join } from 'path';
import { withRouter } from 'react-router-dom';


class RegisterButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, regSuccess: false, regAsAdmin: false, firstName: "", lastName:"", email:"", password:"", adminPassword:""};
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerRedirect = this.registerRedirect.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true})
    close = () => this.setState({ open: false, regFailure: false, regAsAdmin: false, firstName: "", lastName:"", email:"", password:"", adminPassword:""})
    handleChecked = (events) => {
        this.setState({regAsAdmin: !this.state.regAsAdmin})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    registerRedirect = () => {
       Client.sendForm(this.state, "/api/register").then(json => {
           console.log(json.validate)
           if(json.validate == "success") {
               console.log("in success")
               this.props.setLoginTrue()
           } else {
                console.log("reg failed")
                this.setState({regFailure: true})
           }
       })


        // if (Client.sendForm(this.state, "/register")) {
        //     return <Redirect to='/profile'  />
        // } else {
        //     return
        // }
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
                        <Form.Input required fluid name='firstName' label='First name' placeholder='First name'
            onChange={this.handleInputChange} />
                        <Form.Input required fluid name="lastName" label='Last name' placeholder='Last name' value={this.state.lastName}
            onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Field>
                        <Form.Input required fluid name="email" label='Email' placeholder='Email' type='email' value={this.state.email} onChange={this.handleInputChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input required fluid name="password" label='Password' placeholder='Password' type="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </Form.Field>
                    <Form.Field control={Checkbox} name="regAsAdmin" onChange={this.handleChecked} label='Register as Admin'/>

                    {this.state.regAsAdmin && <Form.Input name="adminPassword" fluid label='Admin Password' placeholder='Admin Password' type="password" onChange={this.handleInputChange}/>}
                    <Form.Button type='submit' onClick= {() => { this.registerRedirect() }}>Register</Form.Button>
                </Form>
            </Modal.Description>
            {this.state.regFailure === true && <Message negative>
                Failed to register user.
            </Message>}

            </Modal.Content>
        </Modal>
    )
  }
}

export default withRouter(RegisterButton)
