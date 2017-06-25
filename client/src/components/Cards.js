import React from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Image } from 'semantic-ui-react'
import TypeButton from './TypeButton'
import '../assets/styles/Cards.css'
import { Link } from 'react-router-dom'

const Cards = ({items, colorS,initFetch}) => (
    <Grid columns={3}>
    {
      items.map(item => (
        <Grid.Column key={item.filename} >
          <Link to={`/detail/${item.link}`}>
            <Card centered link>
              <Image src={`http://www.pokemon.jp/zukan/images/m/${item.filename}`} className="hidden-xs" />
              <Card.Content>
                <Image floated='right' size='tiny' src={`http://www.pokemon.jp/zukan/images/s/${item.filename}`} className="hidden-sm hidden-md hidden-lg" />
                <div style={{color:'#000'}}>
                  <h4>{item.pokemon_name}</h4>
                </div>
                <Card.Meta>
                  {`No.${item.zukan_no}`}
                </Card.Meta>
                <ul>
                  {item.type.split(",").map(item => (<li key={item}><TypeButton size='mini' text={item} /></li>))}
                </ul>

              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
        )
      )
    }
    </Grid>
  )


const mapStateToProps = (state) => {
  return {
    items: state.fetch.data
  }
}

export default connect(mapStateToProps)(Cards)
