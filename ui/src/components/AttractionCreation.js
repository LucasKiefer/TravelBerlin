import React, { Component } from 'react'
import { Form, Modal } from 'semantic-ui-react'



class AttractionCreation extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })
  handleSubmit = (e) => this.close();
  show = dimmer => () => this.setState({dimmer, open: true});
  close = () => this.setState({open: false});

  render() {
    const { value } = this.state
    return (
      <Modal open={this.state.open} close={this.close} trigger={<div  className="ui primary button" onClick={this.show('blurring')}>Create Attraction</div>}>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Location Name' placeholder='First name' />
              <Form.Input fluid label='Location Address' placeholder='Last name' />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about the attraction...' />
            <Form.Button>Submit</Form.Button>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AttractionCreation
