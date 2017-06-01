const baseUrl = 'http://10.220.196.18:3000'


const initFetch = (idLimit) => 
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


export default initFetch
