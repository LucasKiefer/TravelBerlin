import React, {Component} from 'react';
import Client from '../Client'
import Center from 'react-center';
import { TextArea, Button, Divider, Segment, Item, Header, Modal, Card, Image, Form, Message, Label, ModalDescription, Comment, Icon, Rating } from 'semantic-ui-react';

class AttractionPage extends Component {
    constructor(props) {
      super(props);
      this.state = {title: '',loading:true, comments: this.props.comments};
      this.handleInputChange=this.handleInputChange.bind(this);
      this.handleRateChange = this.handleRateChange.bind(this);
      this.handleReviewChange = this.handleReviewChange.bind(this);
    }
    reviewShow = dimmer => () => this.setState({ dimmer, reviewOpen: true, reviewFormSuccess: false})
    reviewClose = () => this.setState({ reviewOpen: false})

    show = dimmer => () => this.setState({ dimmer, open: true, formSuccess: false})
    close = () => this.setState({ open: false, editedDescription: this.state.description, editedLocation: this.state.location, editedImageUrl: this.state.imageUrl})
  
    async componentDidMount() {
        this.setState({editedName:this.state.name, editedDescription: this.state.description, editedImageUrl: this.state.imageUrl})
        
        Client.sendForm({}, '/api/user').then(usr => {
              if (usr.user === "Not logged in") {
                this.setState({loggedin: false})
              } else {
                this.setState({loggedin: true, admin: JSON.parse(usr.user).isAdmin, userEmail: JSON.parse(usr.user).email})
                console.log("this.state.userEmail:"+this.state.userEmail)
              }
    
            }
        )



        Client.sendForm({id: parseInt(this.props.match.params.id)}, '/api/getAttraction').then(attraction => {
          console.log(attraction)
            if (attraction === "Could not find") {
              //ADD ERROR TO NOT FOUND
            } else {
              attraction = JSON.parse(attraction.attraction)
              this.setState({loading: false, name:attraction.name, description: attraction.description, location: attraction.location, imageUrl:attraction.imageUrl, editedDescription: attraction.description, editedLocation: attraction.location, editedImageUrl:attraction.imageUrl})
            }

          }
      )
        Client.sendForm({name: "Berlin Wall", author: "thegod@scala.com", comment: "It's super neet", rating: 5}, '/api/deleteComment').then(attraction => {
          // console.log(comment)
          // attraction = JSON.parse(attraction.attraction)
          // console.log(attraction.comments)
          // console.log("Edited comment")
          // console.log(attraction)
          // var attractionJson = JSON.parse(attraction)
          // console.log(attractionJson)
         }
      )
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleReviewChange(event) {
      this.setState({comText: event.target.value})
      console.log(this.state)
    }

    handleRateChange = (e) => {
      if(e != undefined) {
        var rating = e.rating
        this.setState({ rating})
      }
    }

    deleteComment() {
      Client.sendForm({name: this.state.name, author: this.state.userEmail}, "/api/deleteComment");
    }

    createComment(comments) {
      let commentRendered = []
      for(var comm of comments.values()) {
        var arr = Array.from(comm.values())
        console.log(this.state.userEmail == arr[0])
        commentRendered.push(
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>{arr[0]}</Comment.Author>
              <Comment.Metadata>
                {this.getRatings(arr[2])}
              </Comment.Metadata>
              <Comment.Text>{arr[1]}</Comment.Text>
              <Comment.Actions>
                {(this.state.admin || this.state.userEmail == arr[0]) &&
                <Comment.Action color="red"><Icon name="edit"></Icon>Edit</Comment.Action>
                }
                {this.state.admin || this.state.userEmail == arr[0] &&
                <Comment.Action color="red" onClick={this.deleteComment()}><Icon name="delete" color="red"></Icon>Delete</Comment.Action>
                }
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        )

      }
      return commentRendered;
    }

    submitCommentChanges = () => {
      const comment = {name: this.state.name, author: this.state.userEmail, comment: this.state.comText, rating: this.state.rating}
      Client.sendForm(comment, "/api/createComment").then(console.log)
    }

    handleEdit = () => {

    }
    submitChanges = () => {
        const editedAttraction = {id: parseInt(this.props.match.params.id), name: this.state.name, location: this.state.editedLocation, description: this.state.editedDescription, imageUrl: this.state.editedImageUrl}
        Client.sendForm(editedAttraction, "/api/editAttraction").then((json => {
          console.log(json)
            if(json.validate === "success") {
                this.setState({formSuccess:true, location: this.state.editedLocation, description: this.state.editedDescription, imageUrl: this.state.editedImageUrl})
             } else {
               this.setState({formSuccess:false})
            }
        }))
     }

     getRatings = (rating) => {
       let icons = []
       for (let i=0; i<rating;i++) {
         icons.push(<Icon name="star" color="yellow"></Icon>)
       }
       for (let i=rating; i<5;i++) {
        icons.push(<Icon name="star outline" color="gray"></Icon>)
      }
       return icons
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
                            <Comment.Group size="large">
                            <Header as='h3' dividing>
                              Ratings
                            </Header>


                              {this.createComment(this.state.comments)}

                              {this.state.loggedin &&

                                <Modal open={this.state.reviewOpen} onSubmit={() => { this.submitCommentChanges() }} onClose={this.reviewClose} trigger={<div onClick={(e) => e.preventDefault()} className="ui primary button" onClick={this.reviewShow('blurring')}>Add Review</div>}>
                                <Modal.Header>Add Review</Modal.Header>
                                <Modal.Content>
                                <Form reply>
                                  <Form.Field control={TextArea} label='Content' placeholder='What did you think?' value={this.state.comText} onChange={this.handleReviewChange}/>
                                  {this.state.reviewOpen && <Rating label="Rating" maxRating={5} defaultRating={0} icon="star" size='large' color="black" onRate={this.handleRateChange()}/>}
                                  <br></br>
                                  <Button content='Add Review' labelPosition='left' icon='edit' primary />
                                </Form>
                                </Modal.Content>
                                </Modal>


                              
                              }
                            </Comment.Group>
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
