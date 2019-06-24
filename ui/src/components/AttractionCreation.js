import React, { Component } from 'react'
import { Form, Modal } from 'semantic-ui-react'
import Client from "../Client";



class AttractionCreation extends Component {
  state = {name: "", description: "", location: "", imageUrl: ""}

  handleSubmit = (e) => {
    console.log(this.state)
    Client.sendForm(this.state, "/api/create").then(console.log).then(this.close())
  }

  handleName = (e) => {this.setState({name: e.target.value})}
  handleLocation = (e) => {this.setState({location: e.target.value})}
  handleDescription = (e) => {this.setState({description: e.target.value})}
  handleImageUrl = (e) => {this.setState({imageUrl: e.target.value})}

  show = dimmer => () => this.setState({dimmer, open: true});
  close = () => this.setState({open: false, name: "", description: "", location: "", imageUrl:""});

  render() {
    return (
      <Modal open={this.state.open} onClose={this.close} trigger={<div  className="ui primary button" onClick={this.show('blurring')}>Create Attraction</div>}>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input required fluid label='Location Name' placeholder='Location Name' value={this.state.name} onChange={this.handleName}/>
              <Form.Input required fluid label='Location Address' placeholder='Location Address' value={this.state.location} onChange={this.handleLocation}/>
            </Form.Group>
            <Form.Input required fluid type="url" label='Image URL' placeholder='Image URL' value={this.state.imageUrl} onChange={this.handleImageUrl}/>
            <Form.TextArea required label='About' placeholder='Tell us more about the attraction...' value={this.state.description} onChange={this.handleDescription}/>
            <Form.Button>Submit</Form.Button>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AttractionCreation
