import React, { Component } from 'react';
import { connect } from 'react-redux'
import { detailFetch } from '../actions'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.match = this.props.match
  }
  componentDidMount() {
    this.props.dispatch(detailFetch(this.match.params.link))
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'EMPTY_DETAIL_DATA' })
  }
  render() {
    let {data} = this.props
    return (
      <div>{data.num}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data:state.detailFetch.data,
  }
}


export default connect(mapStateToProps)(Detail)

