import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Label,Button, Select } from 'semantic-ui-react'
import {feature, region, type, height, weight} from './FilterData'
import {filterFetch, filterClick, resetFetch} from '../actions'
import TypeButton from './TypeButton'
import '../assets/styles/Filter.css'

const Filters = ({dispatch, tag, isActive}) => {
  return (
    <Grid celled>
      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <ul>
            {
              type.map((item, i) =>
                <li key={item} style={{margin:'3px 5px'}}>
                  <TypeButton
                  size="normal"
                  onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_TYPE'))}
                  text={item}
                  classTag={isActive(i,'type') ? 'active typefilter' : 'typefilter'} />
                </li>
              )
            }
          </ul>
        </Grid.Column>
        <Grid.Column width={8}>
          <List divided verticalAlign='middle'>
            <List.Item>
              <div><Label as='a' tag>高さで探す</Label></div>
                <div>
                  {
                    height.map((item, i) => (
                      <Button key={item} size="tiny" onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_HEIGHT'))} className={isActive(i,'height')?'active':null}>{item}</Button>
                    ))
                  }
                </div>
              </List.Item>
              <List.Item>
                <div><Label as='a' tag>重さで探す</Label></div>
                  <div>
                    {
                      weight.map((item, i) => (
                        <Button key={item} size="tiny" onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_WEIGHT'))} className={isActive(i,'weight')?'active':null}>{item}</Button>
                      ))
                    }
                  </div>
              </List.Item>
              <List.Item>
                <div><Label as='a' tag>特性で探す</Label></div>
                <div>
                  <Select
                  fluid
                  placeholder='特性を選ぶ'
                  options={feature}
                  onChange={(e, { value }) => dispatch(filterClick({ value }.value,'FILTER_CLICK_FEATURE'))} />
                </div>
              </List.Item>
            </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div><Label as='a' tag>地方で探す</Label></div>
            <ul style={{marginTop:'10px'}}>
              {
                region.map((item, i) => (
                  <li key={item.value}>
                  <Button
                  onClick={()=>dispatch(filterClick(i,'FILTER_CLICK_REGION'))}
                  className={isActive(i,'region')?'active':null}>{item.text}</Button></li>
                 ))
              }
            </ul>
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
