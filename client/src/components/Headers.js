import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Headers = () => (
  <div>
    <Header as='h2' block textAlign='center'>
      <Header.Content>
      <Icon name='book' />
        <Link style={{color:'black'}} to="/">ポケモンずかん</Link>
      </Header.Content>
    </Header>
  </div>
)

export default Headers