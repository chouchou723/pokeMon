import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Button, Label, Icon, Select } from 'semantic-ui-react'
import {abilities, region} from './abilities'

const Filters = () => {
  let typeArray = ['ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー']
  return (
    <Grid celled>
      <Grid.Row columns={2}>
        <Grid.Column>
          {typeArray.map(item => <Button key={item} compact size='mini'>{item}</Button>)}
        </Grid.Column>
        <Grid.Column>
          <List divided verticalAlign='middle'>
              <List.Item>
                <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>高さで探す</Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Button >低 い</Button>
                    <Button >ふつう</Button>
                    <Button >高 い</Button>
                  </Grid.Row>
                </Grid>
              </List.Item>
              <List.Item>
              <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>重さで探す</Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Button >軽 い</Button>
                    <Button >ふつう</Button>
                    <Button >重 い</Button>
                  </Grid.Row>
                </Grid>
              </List.Item>
              <List.Item>
                <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>特性で探す</Label>
                 </Grid.Row>
                 <Grid.Row>
                    <Select placeholder='特性を選ぶ' options={abilities} />
                 </Grid.Row>
                </Grid>
              </List.Item>
            </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Grid padded>
            <Grid.Row>
              <Label as='a' tag>地方で探す</Label>
            </Grid.Row>

            {
              region.map(item => (
                <Grid.Column mobile={16} tablet={8} computer={4} key={item}>
                  <Button>{item}</Button>
                </Grid.Column>
              ))
            }


          </Grid>
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
