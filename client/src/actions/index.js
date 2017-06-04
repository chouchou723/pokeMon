const baseUrl = 'http://localhost:3000'


export const initFetch = (idLimit) => 
  async dispatch => {
    dispatch({type:'LOADING'})
    let arr = []
    for (var id = 0; id < idLimit; id++) {
      await fetch(`${baseUrl}/api/init/${id}`)
        .then(res => res.json())
        .then(json => arr.push(json)  )
    }
    dispatch({
      type: 'GET_DATA',
      json: arr
    })
  }

export const moreFetch = (minId,maxId,source) =>
  async dispatch => {
    dispatch({type:'LOADING'})
    let arr = []
    for (var id = minId; id < maxId; id++) {
      await fetch(`${baseUrl}/api/init/${id}`)
        .then(res => res.json())
        .then(json => arr.push(json)  )
    }
    dispatch({
      type: 'MORE_FETCH',
      json: arr
    })
  }

export const searchFetch = (val,idLimit) =>
  async dispatch => {
    let arr = []
    for (var id = 0; id < idLimit; id++) {
      await fetch(`${baseUrl}/api/search/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search: val,
              })
            })
            .then(res => res.json())
            .then(json => {if(json.name!=null)arr.push(json)})
    }
    dispatch({
      type: 'SEARCH_FETCH',
      json: arr
    })
  }
