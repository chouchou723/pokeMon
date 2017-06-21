import React, { Component } from 'react';
import { Grid, Icon, Image, Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailFetch } from '../actions'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.match = this.props.match
  }
  componentDidMount() {
    this.props.dispatch(detailFetch(this.match.params.link))
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'EMPTY_DETAIL_DATA' })
  }
  render() {
    let {data} = this.props
    return (
      <div>
        <Grid textAlign='center'>
          <Grid.Column floated='left' width={1} verticalAlign='middle'>
            <Icon name='chevron left' size='big' />
          </Grid.Column>
          <Grid.Column width={14}>
            <p>{data.num}</p>
            <p>{data.name}</p>
          </Grid.Column>
          <Grid.Column floated='right' width={1} verticalAlign='middle'>
            <Icon name='chevron right' size='big' />
          </Grid.Column>
        </Grid>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image src={`http://www.pokemon.jp${data.profilePhoto}`} />
            </Grid.Column>
            <Grid.Column width={8}>
             <p>タイプ</p>
             <ul>
               <li><Button compact size='mini'>{data.type.split(',')[0]}</Button></li>
               <li><Button compact size='mini'>{data.type.split(',')[1]}</Button></li>
             </ul>
             <p>弱点</p>
             <ul>
               <li><Button compact size='mini'>{data.weaknesses.split(',')[0]}</Button></li>
               <li><Button compact size='mini'>{data.weaknesses.split(',')[1]}</Button></li>
               <li><Button compact size='mini'>{data.weaknesses.split(',')[2]}</Button></li>
               <li><Button compact size='mini'>{data.weaknesses.split(',')[3]}</Button></li>
             </ul>
             <ul>
               <li>分類{data.details[0]}</li>
               <li>特性{data.details[1]}</li>
               <li>高さ{data.details[2]}</li>
               <li>重さ{data.details[3]}</li>
               <li>性別{data.details[4]}</li>
             </ul>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <p>すがた</p>
            {data.pokemonForm.map(item => (
                        <Link to={`${item.link}`} key={item.link}>
                        <Card centered link>
                          <Image src={`http://www.pokemon.jp${item.img}`} className="hidden-xs" />
                          <Card.Content>
                            <Card.Header>
                              {item.name}
                            </Card.Header>
                            <Card.Meta>
                              {`No.${item.num}`}
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      </Link>
                      ))
            }
          </Grid.Row>
          <Grid.Row>
            <p>進 化</p>
            {data.evolution.map(item => (
                        <Link to={`${item.link}`} key={item.link}>
                        <Card centered link>
                          <Image src={`http://www.pokemon.jp${item.img}`} className="hidden-xs" />
                          <Card.Content>
                            <Card.Header>
                              {item.name}
                            </Card.Header>
                            <Card.Meta>
                              {`No.${item.num}`}
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      </Link>
                      ))
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data:state.detailFetch.data,
  }
}


export default connect(mapStateToProps)(Detail)

