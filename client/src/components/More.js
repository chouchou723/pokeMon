import React from 'react'
import { connect } from 'react-redux'
import { moreFetch } from '../actions'
import { Button } from 'semantic-ui-react'

const More = ({ dispatch, minId, maxId }) => (
  <Button size='large' onClick={()=>dispatch(moreFetch(minId, maxId))}>
    More
  </Button>
)

const mapStateToProps = (state) => {
  return {
    minId: state.minId,
    maxId: state.maxId
  }
}

export default connect(mapStateToProps)(More)