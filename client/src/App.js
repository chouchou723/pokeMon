import React, { Component } from 'react';
import Headers from './components/Headers'
import ContainerBox from './components/ContainerBox'
import Detail from './components/Detail'
import {Route,withRouter} from 'react-router-dom'
import './assets/styles/App.css'
import {initFetch} from './actions'
import { connect } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props)
    this.page = this.props.page
  }
  componentDidMount() {
    this.props.dispatch(initFetch(this.page))
  }
  render() {
    return (
      <div>
        <Headers />
        <div style={{width:'530px',margin:'0 auto'}}>
          <Route exact path="/" component={ContainerBox}/>
          <Route path="/detail/:link" component={Detail}/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    page:state.page
  }
}



export default withRouter(connect(mapStateToProps)(App))
