import _ from 'lodash/collection'

export const GET_DATA = 'GET_DATA'
export const MORE_FETCH = 'MORE_FETCH'
export const SEARCH_FETCH = 'SEARCH_FETCH'
export const EMPTY_DATA = 'EMPTY_DATA'
export const LOADING = 'LOADING'
export const RANDOM_FETCH = 'RANDOM_FETCH'
export const FILTER_FETCH = 'FILTER_FETCH'
export const FILTER_CLICK_HEIGHT = 'FILTER_CLICK_HEIGHT'

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://10.220.196.18:3000'

const requestData = (p, type) =>
  dispatch => {
    dispatch({type: LOADING})
    fetch(`${baseUrl}/api/init/${p}`)
    .then(res => res.json())
    .then(json => {
        dispatch({
          type: type,
          json: json
        })
        dispatch({type: LOADING})
      }
    )

  }

const postData = (p, val, type) =>
  dispatch => {
    dispatch({ type: LOADING })
    fetch(`${baseUrl}/api/search/${p}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search: val,
      })
    })
    .then(res => res.json())
    .then(json => {
          dispatch({
            type: type,
            json: json,
            val: val
          })
          dispatch({type: LOADING})
        }
      )
  }

const postFilterData = (p,val, type) =>
  dispatch => {
    let tag = {
      type:val.type.filter(x=>x.isActive===true),
      height:val.height.filter(x=>x.isActive===true),
      weight:val.weight.filter(x=>x.isActive===true),
      feature:'',
      region:val.region.filter(x=>x.isActive===true)
    }
    dispatch({ type: LOADING })
    fetch(`${baseUrl}/api/filter/${p}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag:tag
      })
    })
    .then(res => res.json())
    .then(json =>{
      dispatch({
        type: type,
        json: json,
        val: val
      })
      dispatch({ type: LOADING })
    })
  }

const randomFetch = (val,startId,endId,type) =>
  async dispatch => {
    dispatch({type: LOADING})
    let items = []
    for(let i=startId;i<endId;i++){
      await fetch(`${baseUrl}/api/random`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          random: val[i],
        })
      })
      .then(res => res.json())
      .then(json => items.push(json))
    }
  dispatch({
    type: type,
    json:{ data:items},
    val: val,
    nopage: (endId===val.length) ? true : false
  })
  dispatch({type: LOADING})
}


export const initFetch = (dispatch) => dispatch => {
  dispatch({type: EMPTY_DATA})
  dispatch(requestData(0, GET_DATA))
}

export const random = () => dispatch => {
  dispatch({type: EMPTY_DATA })
  fetch(`${baseUrl}/api/top_zukan`)
    .then(res => res.json())
    .then(json => dispatch(
      randomFetch(_.shuffle(json),0,12,RANDOM_FETCH)
      ))
}

export const searchFetch = (val) => dispatch => {
  dispatch({type: EMPTY_DATA })
  dispatch(postData(0, val, SEARCH_FETCH))
}

export const filterFetch = (val) => dispatch => {
  dispatch({type: EMPTY_DATA })
  dispatch(postFilterData(0, val, FILTER_FETCH))
}

export const filterClick = (i,type) => dispatch => {
  dispatch({
    type: type,
    index:i,
    feature:i
  })
}

export const moreFetch = (p, val, howFetch) => dispatch => {
  switch (howFetch) {
  case 'init':
    dispatch(requestData(p, MORE_FETCH))
    break
  case 'search':
    dispatch(postData(p, val, MORE_FETCH))
    break
  case 'random':
    dispatch(randomFetch(val,p*12,(p+1)*12,MORE_FETCH))
    break
  case 'filter':
    dispatch(postFilterData(p,val, MORE_FETCH))
    break
  default:
    console.log('error');
  }
}






