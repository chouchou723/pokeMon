import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Button, Label, Select } from 'semantic-ui-react'
import {abilities, region, type} from './FilterData.js'
import {filterFetch} from '../actions'

const Filters = ({dispatch}) => {
  let filter = {
    type:['くさ','どく']
  }
  return (
    <Grid celled>
      <Grid.Row columns={2}>
        <Grid.Column width={9}>
          <Grid padded>
          {type.map(item => 
            <Grid.Column mobile={8} tablet={8} computer={4} key={item}>
              <Button size="mini" compact >{item}</Button>
            </Grid.Column>
            )}
          </Grid>
        </Grid.Column>
        <Grid.Column width={7}>
          <List divided verticalAlign='middle'>
              <List.Item>
                <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>高さで探す</Label>
                  </Grid.Row>
                  <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Button>低 い</Button>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Button>ふつう</Button>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Button>高 い</Button>
                  </Grid.Column>
                </Grid>
              </List.Item>
              <List.Item>
              <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>重さで探す</Label>
                  </Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                      <Button >軽 い</Button>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                      <Button >ふつう</Button>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                      <Button >重 い</Button>
                     </Grid.Column>
                </Grid>
              </List.Item>
              <List.Item>
                <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>特性で探す</Label>
                 </Grid.Row>
                 <Grid.Row>
                    <Select fluid placeholder='特性を選ぶ' options={abilities} />
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
                <Grid.Column mobile={8} tablet={8} computer={4} key={item}>
                  <Button>{item}</Button>
                </Grid.Column>
              ))
            }
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column >
          <Button icon="search" content="search" onClick={() => dispatch(filterFetch())} />
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
