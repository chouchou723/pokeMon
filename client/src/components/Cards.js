import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import '../style/Cards.css'

class Cards extends React.Component {
render() {
  let {pokemon_name} = this.props
  return(<Card
        image='http://www.pokemon.jp/zukan/images/m/ff08ec6198db300abc91e69605469427.png'
        header={pokemon_name}
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
      />)
}
}

const mapStateToProps = (state) => {
  return {
    pokemon_name: state.data,
  }
}
export default connect(mapStateToProps)(Cards)