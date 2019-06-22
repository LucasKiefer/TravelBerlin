import React, { Component } from 'react'
import { Form, Modal } from 'semantic-ui-react'
import Client from "../Client";



class AttractionCreation extends Component {
  state = {name: "", description: "", location: ""}

  handleSubmit = (e) => {
    this.close()
    Client.sendForm(this.state, "/api/create").then(console.log)


  }

  handleName = (e) => {this.setState({name: e.target.value})}
  handleLocation = (e) => {this.setState({location: e.target.value})}
  handleDescription = (e) => {this.setState({description: e.target.value})}

  show = dimmer => () => this.setState({dimmer, open: true});
  close = () => this.setState({open: false});

  render() {
    return (
      <Modal open={this.state.open} close={this.close} trigger={<div  className="ui primary button" onClick={this.show('blurring')}>Create Attraction</div>}>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Location Name' placeholder='First name' value={this.state.name} onChange={this.handleName}/>
              <Form.Input fluid label='Location Address' placeholder='Last name' value={this.state.location} onChange={this.handleLocation}/>
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about the attraction...' value={this.state.description} onChange={this.handleDescription}/>
            <Form.Button>Submit</Form.Button>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AttractionCreation
