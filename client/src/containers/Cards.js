import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'semantic-ui-react'
import '../style/Cards.css'

class Cards extends React.Component {
render() {
  let {items, colorS} = this.props

  return(
    <Card.Group itemsPerRow={3}>
    {
      items.map(item => (

        <Card
          key={item.filename}
        >
          <Card.Content>
            <Card.Header>
              {item.pokemon_name}
            </Card.Header>
            <Card.Meta>
              {`No.${item.zukan_no}`}
            </Card.Meta>
            <Button compact size='mini' className={colorS(item.type.split(",")[0])}>{item.type.split(",")[0]}</Button>
            {item.type.split(",")[1]?<Button compact size='mini' className={colorS(item.type.split(",")[1])}>{item.type.split(",")[1]}</Button>:''}
          </Card.Content>
        </Card>
        )
      )
    }
      
    </Card.Group>
  )
}
}

const mapStateToProps = (state) => {
  return {
    items: state.datas,
  }
}
export default connect(mapStateToProps)(Cards)