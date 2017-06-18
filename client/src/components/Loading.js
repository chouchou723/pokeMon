import React from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'

const Loading = ({loadingDisplay}) => (
  <div>
		{loadingDisplay ? <Loader active inline='centered' size='large' /> : <Loader disabled inline='centered' size='large' />}
	</div>
)

const mapStateToProps = (state) => {
  return {
    loadingDisplay: state.loadingDisplay
  }
}

export default connect(mapStateToProps)(Loading)
