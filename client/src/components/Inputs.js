import React from 'react'
import { connect } from 'react-redux'
import { searchFetch } from '../actions'
import { Button, Input } from 'semantic-ui-react'

class Inputs extends React.Component {
	constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {value:'Search'}
  }
	handleChange(e) {
    this.setState({value: e.target.value});
  }
	render() { 
		let { dispatch} =this.props
		let {value} = this.state
		return (
	  	<Input type='text' placeholder='Search...' action >
	  		<input onChange={this.handleChange} />
	  		<Button icon= 'search' onClick={()=>dispatch(searchFetch(value,9))} />
	  	</Input>
		)
	}
}


export default connect()(Inputs)