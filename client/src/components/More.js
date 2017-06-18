import React from 'react'
import { connect } from 'react-redux'
import { moreFetch } from '../actions'
import { Button } from 'semantic-ui-react'

const More = ({ dispatch, page, val, howFetch, noPage, loadingDisplay }) => (
	<div>
  	{
  		!loadingDisplay?<Button fluid size='large' onClick={()=>dispatch(moreFetch(page+1, val, howFetch))} style={noPage?{display:'none'}:{}}>
      More</Button>:null
    }
    </div>
)

const mapStateToProps = (state) => {
  return {
  	loadingDisplay: state.fetch.loadingDisplay,
    page: state.fetch.page,
    val: state.fetch.val,
    howFetch: state.fetch.howFetch,
    noPage: state.fetch.noPage
  }
}

export default connect(mapStateToProps)(More)
