import React, { Component } from 'react';
import Cards from './components/Cards'
import Headers from './components/Headers'
import './style/App.css'


class App extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Cards />
      </div>
    );
  }
}

export default App;
