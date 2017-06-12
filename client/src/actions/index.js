import _ from 'lodash/collection'

export const GET_DATA = 'GET_DATA'
export const MORE_FETCH = 'MORE_FETCH'
export const SEARCH_FETCH = 'SEARCH_FETCH'
export const ADD_LOADING = 'ADD_LOADING'
export const LOADING = 'LOADING'
export const RANDOM_FETCH = 'RANDOM_FETCH'

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://10.220.196.18:3000'

const requestData = (p, type) => dispatch => fetch(`${baseUrl}/api/init/${p}`)
  .then(res => res.json())
  .then(json => dispatch({
    type: type,
    json: json
  }))

const postData = (p, val, type) => dispatch => fetch(`${baseUrl}/api/search/${p}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    search: val,
  })
})
  .then(res => res.json())
  .then(json => dispatch({
    type: type,
    json: json,
    val: val
  }))

const randomFetch = (val,startId,endId,type) => async dispatch => {
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
  console.log(startId,endId)
  dispatch({
        type: type,
        json:{ data:items},
        val: val,
        nopage: (endId===val.length) ? true : false
      })
}


export const initFetch = (dispatch) => dispatch => {
  dispatch({
    type: LOADING
  })
  dispatch(requestData(0, GET_DATA))
}

export const random = () => dispatch => {
  dispatch({
    type: LOADING
  })

  fetch(`${baseUrl}/api/top_zukan`)
    .then(res => res.json())
    .then(json => dispatch(
      randomFetch(_.shuffle(json),0,12,RANDOM_FETCH)
      ))
}



export const searchFetch = (val) => dispatch => {
  dispatch({
    type: LOADING
  })
  dispatch(postData(0, val, SEARCH_FETCH))
}

export const moreFetch = (p, val, howFetch) => dispatch => {
  switch (howFetch) {
  case 'init':
    dispatch({
      type: ADD_LOADING
    })
    dispatch(requestData(p, MORE_FETCH))
    break
  case 'search':
    dispatch({
      type: ADD_LOADING
    })
    dispatch(postData(p, val, MORE_FETCH))
    break
  case 'random':
    dispatch({
      type: ADD_LOADING
    })
    dispatch(randomFetch(val,p*12,(p+1)*12,MORE_FETCH))
    break
  default:
    console.log('error');
  }
}






