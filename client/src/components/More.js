import React from 'react'
import { connect } from 'react-redux'
import { moreFetch } from '../actions'
import { Button } from 'semantic-ui-react'

const More = ({ dispatch, page, val, howFetch, noPage }) => (
  <Button fluid size='large' onClick={()=>dispatch(moreFetch(page,val, howFetch))} style={noPage?{display:'none'}:{}} >
    More
  </Button>
)

const mapStateToProps = (state) => {
  return {
    page: state.page,
    val: state.val,
    howFetch: state.howFetch,
    noPage: state.noPage
  }
}

export default connect(mapStateToProps)(More)