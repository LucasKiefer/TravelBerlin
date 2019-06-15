import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { Modal, Card, Image, Form, Message, Dropdown, Label } from 'semantic-ui-react';
import Center from 'react-center';
import Client from '../Client'

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {title: '', user: {}};
    }
  
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    async componentDidMount() {
      Client.getUser(user => {
        this.setState({
          user: user.content
        });
      });
    }
  
    render() {
      var yearOptions = [];
      for (var i = 2019; i > 1900; i--) {
        yearOptions.push({'key': i, 'value': i, 'text': i})
      }
      
      const { open } = this.state
      const { value } = this.state
      return (
        <div>
          <Header as='h1'>Profile</Header>
          <Center>
            <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>{this.state.user.firstname + this.state.user.lastname}</Card.Header>
              <div>
                <Label as='a' color='blue' tag>
                  User
                </Label>
                <Label as='a' color='green' tag>
                  Administrator
                </Label>
              </div>
              <Card.Description>
                {this.state.user.birthyear}
              </Card.Description>
              <Card.Description>
                {this.state.user.hometown}
              </Card.Description>
              <Card.Description>
                {this.state.user.interests}
              </Card.Description>
            </Card.Content>
            </Card>
          </Center>
          <Modal open={open} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Edit Profile</div>}>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
              <Form success>
              <Form.Group widths='equal'>
                <Form.Input fluid label='First name' placeholder='First name' />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Last name' placeholder='Last name' />
              </Form.Group>
              <Dropdown
                placeholder='Select Year'
                fluid
                search
                selection
                options={yearOptions}
              />
              <Form.Group widths='equal'>
                <Form.Input fluid label='Hometown' placeholder='Hometown' />
              </Form.Group>
              <div>
                <Label as='a' color='blue' tag>
                  User
                </Label>
                <Label as='a' color='green' tag>
                  Administrator
                </Label>
              </div>
              <Form.TextArea label='Interests' placeholder='What are you interested in?' />
              <Form.Button>Submit</Form.Button>
              <Message success header='Saved Changes' content="Your information has been saved!" />
            </Form>
            </Modal.Content>
          </Modal>
          
        </div>
        
      )
    }
  }
  export default Profile;