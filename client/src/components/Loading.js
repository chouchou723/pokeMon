import React from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'

const Loading = ({isdisplay}) => (
  <div>
		{isdisplay ? <Loader active inline='centered' size='large' /> : <Loader disabled inline='centered' size='large' />}
	</div>
)

const mapStateToProps = (state) => {
  return {
    isdisplay: state.isdisplay
  }
}

export default connect(mapStateToProps)(Loading)
