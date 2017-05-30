export const GET_DATA = 'GET_DATA';

let initFetch = id =>
  dispatch =>
    fetch(`http://localhost:3000/api/${id}`)
      .then(res => res.json())
      .then(json => dispatch({
        type: GET_DATA,
        json
      })
      )

export default initFetch