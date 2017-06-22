import React, { Component } from 'react';

export default class Child extends Component {
	render() {
		let match = this.props.match
		return (
			<div>ID: {match.params.id}</div>
		);
	}
}

// const Child = ({ match }) => (
//   <div>
//     <h3>ID: {match.params.id}</h3>
//   </div>
// )

// export default Child