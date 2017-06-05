const baseUrl = 'http://10.220.196.18:3000'


export const initFetch = (p,howFetch) => 
  dispatch => {
    dispatch({type:'LOADING'})
    fetch(`${baseUrl}/api/${howFetch}/${p}`)
      .then(res => res.json())
      .then(json => dispatch({
        type: 'GET_DATA',
        json: json
      }))
  }


export const moreFetch = (p,howFetch) =>
  dispatch => {
    dispatch({type: 'MORE_FETCH'})
    dispatch(initFetch(p+1,howFetch))
  }

export const searchFetch = (p,howFetch,val) =>
  dispatch => {
    dispatch({type:'LOADING'})
    fetch(`${baseUrl}/api/${howFetch}/${p}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          search: val,
        })
      })
      .then(res => res.json())
      .then(json =>  dispatch({
        type: 'SEARCH_FETCH',
        json: json
      }))
    }
   
  
