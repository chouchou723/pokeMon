import React from 'react'
import { connect } from 'react-redux'
import { moreFetch } from '../actions'
import { Button } from 'semantic-ui-react'

const More = ({ dispatch, page, val, howFetch, noPage, isdisplay }) => (
	<div>
  	{
  		!isdisplay?<Button fluid size='large' onClick={()=>dispatch(moreFetch(page+1, val, howFetch))} style={noPage?{display:'none'}:{}}>
      More</Button>:null
    }
    </div>
)

const mapStateToProps = (state) => {
  return {
  	isdisplay: state.isdisplay,
    page: state.page,
    val: state.val,
    howFetch: state.howFetch,
    noPage: state.noPage
  }
}

export default connect(mapStateToProps)(More)
