import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Loader, Grid, Dropdown } from 'semantic-ui-react'
import Cards from '../containers/Cards'
import Headers from './Headers'
import Inputs from './Inputs'
import More from './More'
import '../style/App.css'


class App extends Component {
  colorS(type){
    let typeArray = ['ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'];
    switch (type) {
      case typeArray[0]: return 'ty1'
      case typeArray[1]: return 'ty2'
      case typeArray[2]: return 'ty3'
      case typeArray[3]: return 'ty4'
      case typeArray[4]: return 'ty5'
      case typeArray[5]: return 'ty6'
      case typeArray[6]: return 'ty7'
      case typeArray[7]: return 'ty8'
      case typeArray[8]: return 'ty9'
      case typeArray[9]: return 'ty10'
      case typeArray[10]: return 'ty11'
      case typeArray[11]: return 'ty12'
      case typeArray[12]: return 'ty13'
      case typeArray[13]: return 'ty14'
      case typeArray[14]: return 'ty15'
      case typeArray[15]: return 'ty16'
      case typeArray[16]: return 'ty17'
      case typeArray[17]: return 'ty18'
      default: return 'white'
    }
  }
  render() {
    let {isdisplay} = this.props
    return (
      <div>
        <Headers />
        <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Inputs />
            </Grid.Column>
            <Grid.Column>
              <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='Filter by tag' />
                    <Dropdown.Item>Important</Dropdown.Item>
                    <Dropdown.Item>Announcement</Dropdown.Item>
                    <Dropdown.Item>Discussion</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </Grid.Column>
          </Grid.Row>
          </Grid>
          <Cards colorS={this.colorS} />
          {isdisplay?<Loader active inline='centered' size='large' />:<Loader disabled inline='centered' size='large' />}
          {!isdisplay?<More />:''}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isdisplay: state.isdisplay,
  }
}

export default connect(mapStateToProps)(App)
