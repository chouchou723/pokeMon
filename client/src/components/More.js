import React from 'react'
import { connect } from 'react-redux'
import { moreFetch } from '../actions'
import { Button } from 'semantic-ui-react'

const More = ({ dispatch, page, howFetch }) => (
  <Button size='large' onClick={()=>dispatch(moreFetch(page,howFetch))}>
    More
  </Button>
)

const mapStateToProps = (state) => {
  return {
    page: state.page,
    howFetch: state.howFetch
  }
}

export default connect(mapStateToProps)(More)