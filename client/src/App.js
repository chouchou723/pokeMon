import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Cards from './containers/Cards'
import Headers from './components/Headers'
import Inputs from './components/Inputs'
import './style/App.css'


class App extends Component {
  render() {
    return (
      <div>
      	<Headers />
      	<Container>
      	  <Inputs />
      	  <Cards />
      	</Container>
      </div>
    );
  }
}

export default App;
