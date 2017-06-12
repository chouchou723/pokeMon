import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Grid, Image } from 'semantic-ui-react'
import '../assets/styles/Cards.css'

const Cards = ({items, colorS,initFetch}) => {


  return(
    <Grid>
    {
      items.map(item => (
        <Grid.Column mobile={16} tablet={8} computer={4} key={item.filename}>
          <Card centered link>
            <Grid>
              <Grid.Column only='computer tablet'>
                <Image fluid src={`http://www.pokemon.jp/zukan/images/l/${item.filename}`} />
              </Grid.Column>
            </Grid>
            <Card.Content>
              <Grid padded columns={2}>
              <Grid.Row>
                <Grid.Column width={11}>
                  <Card.Header>
                    {item.pokemon_name}
                  </Card.Header>
                  <Card.Meta>
                    {`No.${item.zukan_no}`}
                  </Card.Meta>
                  <Button compact size='mini' className={colorS(item.type.split(",")[0])}>{item.type.split(",")[0]}</Button>
                  {item.type.split(",")[1]?<Button compact size='mini' className={colorS(item.type.split(",")[1])}>{item.type.split(",")[1]}</Button>:null}
                </Grid.Column>
                <Grid.Column width={5} only='mobile'>
                  <Image floated='right' size='tiny' src={`http://www.pokemon.jp/zukan/images/s/${item.filename}`} />
                </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </Grid.Column>
        )
      )
    }

    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.data
  }
}

export default connect(mapStateToProps)(Cards)
