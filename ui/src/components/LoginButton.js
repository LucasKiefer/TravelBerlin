import React, {Component} from 'react'
import {Modal, Button, Form, Message} from 'semantic-ui-react'
import Client from "../Client"
import { withRouter } from 'react-router-dom';

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, failedLogin: false, email:"", password:""};
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.registerRedirect = this.registerRedirect.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({open: false, failedLogin: false, email:"", password:""})

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    registerRedirect = () => {
       Client.sendForm(this.state, "/api/login").then(json => {
           console.log(json)
           if(json.validate === "success") {
               console.log("login success")
               this.props.setLoginTrue()
            //    this.props.history.push('/profile')
               this.close()
            } else {
               console.log("login failure")
               this.setState({failedLogin: true})
           }
       })
    }
 
    render() {
    const { open } = this.state
    return(
        <Modal open={open} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Login</div>}>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <Form.Input required fluid name="email" label='Email' placeholder='Email' type='email' value={this.state.email} onChange={this.handleInputChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input required fluid name="password" label='Password' placeholder='Password' type="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </Form.Field>
                    <Form.Button type='submit' onClick= {() => { this.registerRedirect() }}>Login</Form.Button>
                </Form>
            </Modal.Description>

            {this.state.failedLogin && <Message negative>
            Incorrect password/email
            </Message>}

            
            </Modal.Content>
        </Modal>
        
    )
  }
}

export default withRouter(LoginButton)
