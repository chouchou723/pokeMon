import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { random } from '../actions'

const RandomButton = ({dispatch, val}) => (
  <div>
		<Button fluid content='Random' onClick={() => dispatch(random(val))} />
	</div>
)

const mapStateToProps = (state) => {
  return {
    val: state.val
  }
}

export default connect(mapStateToProps)(RandomButton)
