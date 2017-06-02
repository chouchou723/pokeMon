const baseUrl = 'http://10.220.196.18:3000'


export const initFetch = (idLimit) => 
  async dispatch => {
    let arr = []
    for (var id = 0; id < idLimit; id++) {
      await fetch(`${baseUrl}/api/${id}`)
        .then(res => res.json())
        .then(json => arr.push(json)  )
    }
    dispatch({
      type: 'GET_DATA',
      json: arr
    })
  }

export const moreFetch = (minId,maxId) =>
  async dispatch => {
    let arr = []
    for (var id = minId; id < maxId; id++) {
      await fetch(`${baseUrl}/api/${id}`)
        .then(res => res.json())
        .then(json => arr.push(json)  )
    }
    dispatch({
      type: 'MORE_FETCH',
      json: arr
    })
  }

export const searchFetch = (val) =>
  async dispatch => {
    let arr = []
    
    await fetch(`${baseUrl}/api/search/0`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          search: val,
        })
      })
      .then(res => res.json())
      .then(json => arr.push(json))
    console.log(val);
    dispatch({
      type: 'SEARCH_FETCH',
      json: arr
    })
  }
