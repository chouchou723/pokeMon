import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Button, Label, Select } from 'semantic-ui-react'
import {feature, region, type, height, weight} from './FilterData'
import {filterFetch, filterClick, resetFetch} from '../actions'
import '../assets/styles/Filter.css'

const Filters = ({dispatch, colorS, tag, isActive}) => {
  return (
    <Grid celled>
      <Grid.Row columns={2}>
        <Grid.Column width={9}>
          <Grid padded>
          {type.map((item, i) =>
              <Button 
              key={item} 
              size="mini" 
              compact 
              onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_TYPE'))} 
              className={isActive(i,'type') ? 'active '+colorS(item) : colorS(item)}>
                {item}
              </Button>
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
                  {
                    height.map((item, i) => (
                      <Button key={item} onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_HEIGHT'))} className={isActive(i,'height')?'active':null}>{item}</Button>
                    ))
                  }
                </Grid>
              </List.Item>
              <List.Item>
              <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>重さで探す</Label>
                  </Grid.Row>
                   {
                    weight.map((item, i) => (
                      <Button key={item} onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_WEIGHT'))} className={isActive(i,'weight')?'active':null}>{item}</Button>
                    ))
                  }
                </Grid>
              </List.Item>
              <List.Item>
                <Grid padded>
                  <Grid.Row>
                    <Label as='a' tag>特性で探す</Label>
                 </Grid.Row>
                 <Grid.Row>
                  <Select fluid placeholder='特性を選ぶ' options={feature}
                  onChange={(e, { value }) => dispatch(filterClick({ value }.value,'FILTER_CLICK_FEATURE'))} />
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
              region.map((item, i) => (
                  <Button 
                  key={item.value} 
                  onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_REGION'))} 
                  className={isActive(i,'region')?'active':null}>{item.text}</Button>
              ))
            }
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column >
          <Button icon="refresh" content="reset" onClick={() => dispatch(resetFetch(tag))} />
          <Button icon="search" content="search" onClick={() => dispatch(filterFetch(tag))} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    tag:state.filter,
    isActive:(i,tag) => state.filter[tag][i].isActive
  }
}

export default connect(mapStateToProps)(Filters)
