import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class Attraction extends React.Component {

  // attractionRedirect = () => (this.props.history.push('/'+ this.props.name))
    render() {
        return(
            <div id="blk">
                <Card>
                  <Image src={this.props.imageurl} wrapped  ui={false} />
                  <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>
                      <span className='date'>{this.props.location}</span>
                    </Card.Meta>
                    <Card.Description>
                      {this.props.description}
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

export default Attraction;