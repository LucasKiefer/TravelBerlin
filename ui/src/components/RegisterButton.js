import React, {Component} from 'react'
import {Modal, Form, Checkbox} from 'semantic-ui-react'
import Client from '../Client'


function sendForm() {
    console.log("in client send form")
    postData('/register', {answer: 42})
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
  

class RegisterButton extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, isChecked: false};
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formClicked = this.formClicked.bind(this);
    }
    
    show = dimmer => () => this.setState({ dimmer, open: true})
    close = () => this.setState({ open: false })
    handleChecked = (events) => {
        this.setState({isChecked: !this.state.isChecked})
    }

    formClicked = (event) => {
        console.log("in form clicked")
        // Client.sendForm()
        sendForm();
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // fetch('/register', {
        //     method: 'POST',
        //     body: data,
        // });

        (async () => {
            const rawResponse = await fetch('/register', {
              method: 'POST',
              body: data//JSON.stringify(data)
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
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
                    <Form.Button type='submit' onClick={this.formClicked}>Register</Form.Button>
                </Form>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  }
}

export default RegisterButton
