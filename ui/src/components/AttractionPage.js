import React, {Component} from 'react';
import Client from '../Client'
import Center from 'react-center';
import { Divider, Segment, Item, Header, Modal, Card, Image, Form, Message, Label, ModalDescription } from 'semantic-ui-react';

class AttractionPage extends Component {
    constructor(props) {
      super(props);
      this.state = {title: '',loading:true};
      this.handleInputChange=this.handleInputChange.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true, formSuccess: false})
    close = () => this.setState({ open: false})
  
    async componentDidMount() {
        this.setState({
            loading: false, name:"Berlin Wall", description:"The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989. The Berlin Wall was a guarded concrete barrier that physically and ideologically divided Berlin from 1961 to 1989.", location:"Throughout Berlin", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Berlin_-_Reichstagsgeb%C3%A4ude3.jpg/2880px-Berlin_-_Reichstagsgeb%C3%A4ude3.jpg"
        })
        


        this.setState({editedName:this.state.name, editedDescription: this.state.description, editedImageUrl: this.state.imageUrl})
        
        Client.sendForm({}, '/api/user').then(usr => {
            console.log(usr.user)
              if (usr.user === "Not logged in") {
                this.setState({loggedin: false})
              } else {
                this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin})
              }
    
            }
        )
        Client.sendForm({id: this.props.match.params.id}, '/api/getAttraction').then(attraction => {
          console.log(attraction)
            // if (usr.user === "") {
            //   this.setState({loggedin: false})
            // } else {
            //   this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin})
            // }
  
          }
      )
      // Client.getAttraction(this.props.match.params.id, summary => {
      //   this.setState({
      //     attraction: summary.content
      //   });
      // });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
        this.setState({
          [name]: value
        });
        console.log(this.state)
    }

    submitChanges = () => {
        const editedAttraction = {name: this.state.name, location: this.state.editedLocation, description: this.state.editedDescription, imageUrl: this.state.editedImageUrl}
        Client.sendForm(editedAttraction, "/api/editAttraction").then((json => {
            if(json.validate === "success") {
                this.setState({formSuccess:true, location: this.state.editedLocation, description: this.state.editedDescription, imageUrl: this.state.editedImageUrl})
             } else {
            }
        }))
     }
  
    render() {
      return (
        <div className="AttractionPage">
            <Segment loading={this.state.loading} raised textAlign='left' size="huge">
                <Item.Group>
                    <Item>
                        <Item.Image size="large" alt="Location" src={this.state.imageUrl} wrapped ui={false}/>
                        <Item.Content>
                            <Item.Header>{this.state.name}</Item.Header>
                            <Divider/>
                            <Item.Meta>{this.state.location}</Item.Meta>
                            <Item.Description size="16">
                                {this.state.description}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
                <Center>
                {this.state.admin &&
            <Modal open={this.state.open} onSubmit={() => { this.submitChanges() }} onClose={this.close} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.show('blurring')}>Edit Attraction</div>}>
                <Modal.Header>Edit Attraction: {this.state.name}</Modal.Header>
                <Modal.Content>
                <Form success={this.state.formSuccess} >
                <Form.Input required fluid label='Location' placeholder='Location' value={this.state.editedLocation} onChange={this.handleInputChange} name="editedLocation"/>
                <Form.TextArea required label='Description' placeholder='Description' value={this.state.editedDescription} onChange={this.handleInputChange} name="editedDescription"/>
                <Form.Input required fluid label='Image URL' placeholder='Image URL' value={this.state.editedImageUrl} onChange={this.handleInputChange} name="editedImageUrl"/>
                <Form.Button>Save Changes</Form.Button>

                <Message success header='Saved Changes' content="Your information has been saved!" />
                </Form>
                </Modal.Content>
            </Modal>
          }
          </Center>
            </Segment>
        </div>
    );
    }
  }
  export default AttractionPage;
