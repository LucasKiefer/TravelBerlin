import React from 'react';
import { Card, Icon, Image} from 'semantic-ui-react'
import { Redirect } from 'react-router'
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Attraction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {redirect:false}
    }
    async componentDidMount() {
      let attractUrl ='/attraction/'.concat(this.props.id)
      this.setState({url:attractUrl})
    }

    attractionRedirect = () => (
      this.setState({redirect:true, url:'/attraction/'.concat(this.props.id)})
    )

    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.url}/>;
        }
        return(
            <div id="blk">
                <Card fluid="true">
                    <Image onClick={this.attractionRedirect} alt={this.props.name} src={this.props.imageUrl} />
                  <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>
                      <span className='date'>{this.props.location}</span>
                    </Card.Meta>
                    <Card.Description height="900">
                      <div height = "900px">
                      {this.props.description !== undefined ?
                        this.props.description.split(".")[0] : ""}
                      </div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a href = {"https://www.google.com/maps/search/?api=1&query=" + encodeURI(this.props.name)} target="_blank">
                      <Icon name='location arrow' />
                      Go here
                    </a>
                  </Card.Content>
                </Card>
            </div>
        )
    }
}

export default Attraction
