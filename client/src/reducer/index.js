import { GET_DATA } from '../actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case  GET_DATA:
      return {
        ...state,
        data: action.json.pokemon_name
      }
    default:
      return state
  }
}

export default reducer