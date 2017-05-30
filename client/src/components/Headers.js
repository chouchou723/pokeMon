import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import Inputs from './Inputs'

const Headers = () => (
  <div>
    <Header as='h2' block textAlign='center'>
      <Header.Content>
      <Icon name='book' />
        ポケモンずかん
      </Header.Content>
    </Header>
    <Inputs />
  </div>
)

export default Headers