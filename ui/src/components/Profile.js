import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { Modal, Card, Image, Form, Message, Label } from 'semantic-ui-react';
import Center from 'react-center';
import Client from '../Client';
import AttractionCreation from './AttractionCreation'

const options = [

]

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {title: '', options, user: {}, firstName:"", lastName:"", birthYear:"",interests:"",homeTown:"", formSuccess: false,  isAdmin: false};
      this.handleInputChange=this.handleInputChange.bind(this);
      this.handleInterestChange=this.handleInterestChange.bind(this);
      this.addToOption=this.addToOption.bind(this);
      this.show = this.show.bind(this);
      this.close = this.close.bind(this);
    }

    

    handleAddition = (e, { value }) => {
      this.setState(prevState => ({
        options: [{ text: value, value }, ...prevState.options],
      }))
    }

    show = dimmer => () => this.setState({ dimmer, open: true, firstName: this.state.user.firstName, lastName: this.state.user.lastName, birthYear:this.state.user.birthYear, interests: this.state.user.interests, homeTown: this.state.user.homeTown, formSuccess: false })
    close = () => this.setState({ open: false})

    async componentDidMount() {

      Client.sendForm({}, '/api/user').then(usr => {
          this.setState({user: JSON.parse(usr.user)})
          this.state.user.interests.forEach( 
            this.addToOption
          )
          this.setState({isAdmin: this.state.user.isAdmin})
        }
      )
    }

    addToOption(value) {
      let newOpt = { key: value, text: value, value: value}
      if (!this.state.options.includes(newOpt) && value!="") {
        this.state.options.push(newOpt)
      }
    }


    handleInterestChange = (e, { value }) => this.setState({ interests: value })

    handleYearChange = (e, { value }) => this.setState({ birthYear: value })

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    submitChanges = () => {
      const editedUser = {email:this.state.user.email, firstName: this.state.firstName, lastName: this.state.lastName, birthYear:this.state.birthYear, interests: this.state.interests, homeTown: this.state.homeTown}
      Client.sendForm(editedUser, "/api/edit").then(json => {
          if(json.validate === "success") {
              this.setState({formSuccess:true, user: editedUser})
           } else {
          }
      })
   }

    render() {
      var yearOptions = [];
      for (var i = 2019; i > 1900; i--) {
        yearOptions.push({'key': i, 'value': i, 'text': i})
      }

      var tag = this.state.user.isAdmin ? <Label color='green' tag>Administrator</Label>: <Label color='blue' tag>User</Label>

      //TODO: make this not user.user
      const { open } = this.state;
      return (
        <div>
          <Header as='h1'>Profile</Header>
          <Center>
            <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>{this.state.user.firstName === undefined && this.state.user.lastName === undefined ? "Loading" : this.state.user.firstName + " " + this.state.user.lastName}</Card.Header>
              <div>
                {tag}
              </div>
              <Card.Description>
                {this.state.user.birthYear === undefined ? "Loading" : (this.state.user.birthYear === 0 ? "" : this.state.user.birthYear) }
              </Card.Description>
              <Card.Description>
                {this.state.user.homeTown === undefined ? "Loading" : this.state.user.homeTown}
              </Card.Description>
              <Card.Description>
                {this.state.user.interests === undefined ? "Loading" : this.state.user.interests}
              </Card.Description>
              <Card.Description>

              </Card.Description>
            </Card.Content>
            </Card>
          </Center>
          {this.state.isAdmin &&  <AttractionCreation  />}

          <Modal open={open} onSubmit={() => { this.submitChanges() }} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Edit Profile</div>}>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
              <Form success={this.state.formSuccess} >
              <Form.Group widths='equal'>
                <Form.Input required fluid label='First name' placeholder='First name' value={this.state.firstName} onChange={this.handleInputChange} name="firstName"/>
                <Form.Input required fluid label='Last name' placeholder='Last name' value={this.state.lastName} onChange={this.handleInputChange} name="lastName"/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Select
                  placeholder='Select Year'
                  label="Birth Year"
                  fluid
                  search
                  selection
                  options={yearOptions}
                  name="birthYear"
                  value={this.state.birthYear}
                  onChange={this.handleYearChange}
                />
                <Form.Input fluid label='Hometown' placeholder='Hometown' value={this.state.homeTown} onChange={this.handleInputChange} name="homeTown"/>
              </Form.Group>
              <Form.Dropdown
                label="List your interests:"
                options={this.state.options}
                placeholder='Interests'
                search
                selection
                fluid
                multiple
                allowAdditions
                value={this.state.interests}
                onAddItem={this.handleAddition}
                onChange={this.handleInterestChange}
                />
              <Form.Button>Save Changes</Form.Button>

              <Message success header='Saved Changes' content="Your information has been saved!" />
            </Form>
            </Modal.Content>
          </Modal>

        </div>

      )
    }
  }
  export default Profile;
