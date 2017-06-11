import React from 'react'
import { connect } from 'react-redux'
import { searchFetch } from '../actions'
import { Button, Input } from 'semantic-ui-react'

const Inputs = ({ dispatch, page}) => {
  let input
  let onKeyUp = (e) => {
    e.keyCode === 13 && dispatch(searchFetch(input.value))
  }
  return(
  <Input type='text' placeholder='Search...' action fluid >
    <input ref={node => {input = node}} onKeyUp={onKeyUp} />
    <Button icon= 'search' onClick={()=>dispatch(searchFetch(input.value))} />
  </Input>
  )

}



const mapStateToProps = (state) => {
  return {
    page: state.page,
    howFetch: state.howFetch
  }
}

export default connect(mapStateToProps)(Inputs)
