import React, { Component } from 'react';
import { Grid, Icon, Image, Loader,Dimmer } from 'semantic-ui-react'
import TypeButton from './TypeButton'
import '../assets/styles/Detail.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailFetch } from '../actions'
import imgInit from '../assets/images/init.jpg'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.match = this.props.match
  }
  componentDidMount() {
    this.props.dispatch(detailFetch(this.props.match.params.link))
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.link !== this.props.match.params.link){
      this.props.dispatch(detailFetch(nextProps.match.params.link))
    }
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'EMPTY_DETAIL_DATA' })
  }
  render() {
    let {data, loadingDisplay} = this.props
    return (
      <div>
        <Grid textAlign='center'>
          <Grid.Column floated='left' width={2} verticalAlign='middle'>
            {data.prev===null?null:<Link to={`/detail/${data.prev}`}><Icon name='chevron left' size='big' /></Link>}
          </Grid.Column>
          <Grid.Column width={12}>
            <p>{data.num}</p>
            <div><h2>{data.name}</h2></div>
          </Grid.Column>
          <Grid.Column floated='right' width={2} verticalAlign='middle'>
            {data.next===null?null:<Link to={`/detail/${data.next}`}><Icon name='chevron right' size='big' /></Link>}
          </Grid.Column>
        </Grid>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={8} verticalAlign='middle'>
              {data.profilePhoto===""?<Image src={imgInit} />:<Image src={`http://www.pokemon.jp${data.profilePhoto}`} />}
            </Grid.Column>
            <Grid.Column width={8}>
             <p>タイプ</p>
             <ul>
              {data.type.split(',').map(item =>
                <li key={item}><TypeButton size='big' text={item} /></li>
              )}
             </ul>
             <p>弱点<span>※(★)はダメージ4倍</span></p>
             <ul>
              {data.weaknesses.split(',').map(item =>
                <li key={item}><TypeButton size='big' text={item} /></li>
              )}
             </ul>
             <ul>
               <li><span style={{fontWeight:'bold'}}>分類:</span>{data.details[0]}</li>
               <li><span style={{fontWeight:'bold'}}>特性:</span>{data.details[1]}</li>
               <li><span style={{fontWeight:'bold'}}>高さ:</span>{data.details[2]}</li>
               <li><span style={{fontWeight:'bold'}}>重さ:</span>{data.details[3]}</li>
               <li><span style={{fontWeight:'bold'}}>性別:</span>&nbsp;
                {
                  data.details[4]==='sex-n'?null:data.details[4].split(",").map(item => <Icon key={item} size="mini" circular name={item==='sex-m'?'man':'woman'} />)
                }
               </li>
             </ul>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column>
            <p>すがた</p>
            {
              data.pokemonForm.length===0?<h1 style={{textAlign: 'center'}}>なし</h1>:<ul className='pokemon-form'>
                {
                  data.pokemonForm.map(item => (
                    <li key={item.link} style={{width:'160px'}}>
                      <Link to={`/detail/${item.link}`}>
                        <div><Image src={`http://www.pokemon.jp${item.img}`} className="hidden-xs" /></div>
                        <div><h4>{item.name}</h4></div>
                        <p>{item.num}</p>
                        <ul>{item.type.split(",").map(item => (<li key={item}><TypeButton size='mini' text={item} /></li>))} </ul>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p>進 化</p>
              {data.evolution.length===0?<h1 style={{textAlign: 'center'}}>なし</h1>:<ul>
                <li>
                  <ul className='evolution'>
                    {
                      data.evolution.map(item => (
                        <li key={item.link} style={{width:'88px'}}>
                          <Link to={`/detail/${item.link}`}>
                            <div className="img">
                              <Image src={`http://www.pokemon.jp${item.img}`} className="hidden-xs" />
                            </div>
                            <div><h4>{item.name}</h4></div>
                            <p>{item.num}</p>
                            <ul>
                              {item.type.split(",").map(item => (<li key={item}><TypeButton size='mini' text={item} /></li>))}
                            </ul>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </li>
                <li>
                  <ul className='evolution_branch' style={{flexDirection: 'column'}}>
                    {
                      data.evolution_branch.map(item => (
                        <li key={item.link} style={{width:'88px'}}>
                          <Link to={`/detail/${item.link}`}>
                            <div className="img">
                              <Image src={`http://www.pokemon.jp${item.img}`} className="hidden-xs" />
                            </div>
                            <div><h4>{item.name}</h4></div>
                            <p>{item.num}</p>
                            <ul>
                              {item.type.split(",").map(item => (<li key={item}><TypeButton size='mini' text={item} /></li>))}
                            </ul>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              </ul>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {
          loadingDisplay?
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data:state.detailFetch.data,
    loadingDisplay: state.loadingDisplay
  }
}

export default connect(mapStateToProps)(Detail)
