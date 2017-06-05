const baseUrl = 'http://localhost:3000'


export const initFetch = () => 
  dispatch => {
    dispatch({type:'LOADING'})
    fetch(`${baseUrl}/api/init/0`)
      .then(res => res.json())
      .then(json => dispatch({
        type: 'GET_DATA',
        json: json
      }))
  }



export const moreFetch = (p,val,howFetch) =>
  dispatch => {
    switch(howFetch) {
      case 'init':
        dispatch({type:'LOADING'})
        fetch(`${baseUrl}/api/init/${p+1}`)
          .then(res => res.json())
          .then(json => dispatch({
            type: 'MORE_FETCH',
            json: json
          }))
        break
      case 'search':
        dispatch({type:'LOADING'})
        fetch(`${baseUrl}/api/search/${p+1}`, {
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
                type: 'MORE_FETCH',
                json: json
              }))
        break
      default:
        initFetch(2)
    }
  }

export const searchFetch = (val) =>
  dispatch => {
    dispatch({type:'LOADING'})
    fetch(`${baseUrl}/api/search/0`, {
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
        json: json,
        val
      }))
    }
   

    
 
