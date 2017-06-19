import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react'
import Headers from './components/Headers'
import ContainerBox from './components/ContainerBox'
import Detail from './components/Detail'
import {Route} from 'react-router-dom'
import './assets/styles/App.css'


class App extends Component {
 
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column>
            <Headers />
          </Grid.Column>
        </Grid>
        <Container>
          <Route exact path="/" component={ContainerBox}/>
          <Route path="/detail/:link" component={Detail}/>
        </Container>
      </div>
    );
  }
}


export default App
