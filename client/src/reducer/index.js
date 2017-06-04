let initState = {
  datas:[],
  minId:0,
  maxId:9,
  howFetch:'initFetch',
  isdisplay:true
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case  'GET_DATA':
      return {
        ...state,
        datas: action.json,
        minId: state.minId+9,
        maxId: state.maxId+9,
        howFetch:'initFetch',
        isdisplay:false
      }
    case 'MORE_FETCH':
      return {
        ...state,
        datas: state.datas.concat(action.json),
        minId: state.minId+9,
        maxId: state.maxId+9,
        isdisplay:false
      }
    case 'SEARCH_FETCH':
      return {
        ...state,
        datas: action.json,
        minId: state.minId+9,
        maxId: state.maxId+9,
        howFetch:'searchFetch'
       }
    case 'LOADING':
      return{
        ...state,
        isdisplay:true
      }
    default:
      return state
  }
}

export default reducer