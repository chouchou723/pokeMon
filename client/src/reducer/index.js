let initState = {
  data:[],
  gap:9,
  page:0,
  howFetch:'init',
  isdisplay:true,
  noPage: false,
  val:''
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case  'GET_DATA':
      return {
        ...state,
        data:action.json.data,
        noPage:action.json.noPage,
        howFetch:'init',
        page: 0,
        isdisplay:false
      }
    case 'MORE_FETCH':
      return {
        ...state,
        data: state.data.concat(action.json.data),
        noPage:action.json.noPage,
        page:state.page+1,
        isdisplay:false
      }
    case 'SEARCH_FETCH':
      return {
        ...state,
        data: action.json.data,
        noPage:action.json.noPage,
        howFetch:'search',
        page: 0,
        isdisplay:false,
        val:action.val
       }
    case 'LOADING':
      return {
        ...state,
        isdisplay:true
      }
    default:
      return state
  }
}

export default reducer