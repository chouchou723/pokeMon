import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Button } from 'semantic-ui-react'

const Filters = () => {
  let typeArray = ['ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'];
  return(
    <Grid celled>
      <Grid.Row columns={2}>
        <Grid.Column>
          {typeArray.map(item => <Button compact size='mini'>{item}</Button>)}
        </Grid.Column>
        <Grid.Column>
          <List divided verticalAlign='middle'>
              <List.Item>
                <div>高さで探す</div>
              </List.Item>
              <List.Item>Pears</List.Item>
              <List.Item>Oranges</List.Item>
            </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          1
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.data
  }
}

export default connect()(Filters)