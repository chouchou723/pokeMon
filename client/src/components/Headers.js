import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Headers = () => (
  <div style={{backgroundColor:'#F3F4F5',textAlign:'center',padding:'1rem'}}>
      <h2>
        <Icon name='book' />
        <Link style={{color:'black'}} to="/">ポケモンずかん</Link>
      </h2>
  </div>
)

export default Headers
