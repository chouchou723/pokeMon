import _ from 'lodash/collection'

export const GET_DATA = 'GET_DATA'
export const MORE_FETCH = 'MORE_FETCH'
export const SEARCH_FETCH = 'SEARCH_FETCH'
export const EMPTY_DATA = 'EMPTY_DATA'
export const LOADING_ON = 'LOADING_ON'
export const LOADING_OFF = 'LOADING_OFF'
export const RANDOM_FETCH = 'RANDOM_FETCH'
export const FILTER_FETCH = 'FILTER_FETCH'
export const FILTER_CLICK_HEIGHT = 'FILTER_CLICK_HEIGHT'
export const RESET_FETCH = 'RESET_FETCH'
export const FILTER_CLICK_RESET = 'FILTER_CLICK_RESET'
export const DETAIL_FETCH = 'DETAIL_FETCH'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://111.231.84.241:3000'
// const baseUrl = 'https://pokemonserver-rzozwnyqua.now.sh'

const requestData = (p, type) =>
  dispatch => {
    dispatch({type: LOADING_ON})
    fetch(`${baseUrl}/api/init/${p}`)
    .then(res => res.json())
    .then(json => {
        dispatch({
          type: type,
          json: json
        })
        dispatch({type: LOADING_OFF})
      }
    )

  }

const postData = (p, val, type) =>
  dispatch => {
    dispatch({ type: LOADING_ON })
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
          dispatch({type: LOADING_OFF})
        }
      )
  }

const postFilterData = (p,val, type) =>
  dispatch => {
    let tag = {
      type:val.type.filter(x=>x.isActive===true),
      height:val.height.filter(x=>x.isActive===true),
      weight:val.weight.filter(x=>x.isActive===true),
      feature:val.feature,
      region:val.region.filter(x=>x.isActive===true)
    }
    dispatch({ type: LOADING_ON })
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
      dispatch({ type: LOADING_OFF })
    })
  }

const randomFetch = (val,startId,endId,type) =>
  async dispatch => {
    dispatch({type: LOADING_ON})
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
  dispatch({type: LOADING_OFF})
}


export const initFetch = (dispatch) => dispatch => {
  dispatch({type: EMPTY_DATA})
  dispatch(requestData(0, GET_DATA))
}

export const resetFetch = (dispatch) => dispatch => {
  dispatch({type: EMPTY_DATA})
  dispatch({type: FILTER_CLICK_RESET})
  dispatch(requestData(0, RESET_FETCH))
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
export const detailFetch = link =>
  dispatch => {
      dispatch({type: LOADING_ON})
      fetch(`${baseUrl}/api/detail/${link}`)
      .then(res => res.json())
      .then(json => {
          dispatch({
            type: DETAIL_FETCH,
            data: json
          })
          dispatch({type: LOADING_OFF})
        }
      )
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






