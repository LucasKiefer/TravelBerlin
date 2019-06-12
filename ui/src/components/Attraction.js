import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class Attraction extends React.Component {
    render() {
        return(
            <div id="blk">
                <Card>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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
                    <a href = "http://maps.google.com">
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