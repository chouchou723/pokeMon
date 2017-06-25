import React, { Component } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Cards from './Cards'
import Inputs from './Inputs'
import More from './More'
import RandomButton from './RandomButton'
import FilterButton from './FilterButton'
import Filters from './Filters'


class ContainerBox extends Component {
  constructor(props){
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
    this.state= { showFilters:false }
  }
  handleToggle() {
    this.setState({
      showFilters:!this.state.showFilters
    })
  }
  render() {
    let {loadingDisplay} =this.props
    return (
      <div>
        <Grid className="filterGroup">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Inputs />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <FilterButton handleToggle={this.handleToggle} />
            </Grid.Column>
            <Grid.Column width={16}>
            {this.state.showFilters?<Filters />:null}
            </Grid.Column>
          </Grid.Row>

        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <RandomButton />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{paddingTop:'0'}}>
            <Grid.Column>
              <Cards colorS={this.colorS} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          {loadingDisplay ? <Loader active inline='centered' size='large' style={{margin:'20px auto'}} /> : <Loader disabled inline='centered' size='large' />}
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
            <More />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    loadingDisplay: state.loadingDisplay
  }
}

export default connect(mapStateToProps)(ContainerBox)

