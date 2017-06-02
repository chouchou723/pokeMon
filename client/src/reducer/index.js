let initState = {
  datas:[],
  minId:0,
  maxId:9
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case  'GET_DATA':
      return {
        ...state,
        datas: action.json,
        minId: state.minId+9,
        maxId: state.maxId+9
      }
     case 'MORE_FETCH':
      return {
        ...state,
        datas: state.datas.concat(action.json),
        minId: state.minId+9,
        maxId: state.maxId+9
      }
      case 'SEARCH_FETCH':
       return {
         ...state,
         datas: action.json,
         minId: state.minId+9,
         maxId: state.maxId+9
       }
    default:
      return state
  }
}

export default reducer