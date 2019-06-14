import React, {Component} from 'react'
import {Modal, Button, Form} from 'semantic-ui-react'


function sendForm(state) {
    console.log("in client send form")
    postData('/login', state)
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  }
  
  function postData(url = '', data = {}) {
    console.log("in console post data");
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
  }

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, email:"", password:""};
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
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
                    <Form.Button type='submit' onClick= {() => { sendForm(this.state) }}>Login</Form.Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default LoginButton