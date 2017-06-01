const reducer = (state = {datas:[]}, action) => {
  switch (action.type) {
    case  'GET_DATA':
      return {
        ...state,
        datas: action.json
      }
    default:
      return state
  }
}

export default reducer