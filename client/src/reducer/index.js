import { combineReducers } from 'redux'
import { type, height, weight,region } from '../components/FilterData'

let initState = {
  data:[],
  page:0,
  howFetch:'init',
  noPage: false,
  val:[]
}

let filterInit = {
  type:type.map(item => ({tag:item,isActive:false})),
  height:height.map(item => ({tag:item,isActive:false})),
  weight:weight.map(item => ({tag:item,isActive:false})),
  feature:null,
  region:region.map(item => ({tag:item.value,isActive:false}))
}

const fetch = (state = initState, action) => {
  switch (action.type) {
    case  'GET_DATA':
      return {
        ...state,
        data:action.json.data,
        noPage:action.json.noPage,
        howFetch:'init',
        page: 0,
      }
    case  'RESET_FETCH':
      return {
        ...state,
        data:action.json.data,
        noPage:action.json.noPage,
        howFetch:'init',
        page: 0,
      }
    case 'MORE_FETCH':
      return {
        ...state,
        data: state.data.concat(action.json.data),
        noPage:action.json.noPage,
        page:state.page+1,
      }
    case 'SEARCH_FETCH':
      return {
        ...state,
        data: action.json.data,
        noPage:action.json.noPage,
        howFetch:'search',
        page: 0,
        val:action.val
       }
    case 'RANDOM_FETCH':
      return {
        ...state,
        data:action.json.data,
        noPage: action.nopage,
        howFetch:'random',
        page: 0,
        val: action.val
       }
    case 'FILTER_FETCH':
      return {
        ...state,
        data:action.json.data,
        noPage:action.json.noPage,
        howFetch:'filter',
        page: 0,
        val:action.val
      }
    case 'EMPTY_DATA':
      return {
        ...state,
        data:[]
      }
    default:
      return state
  }
}
const loadingDisplay = (state = false, action) => {
  switch (action.type) {
    case  'LOADING':
      return !state
    default:
      return state
  }
}
const filter = (state = filterInit, action) => {
  switch (action.type) {
    case 'FILTER_CLICK_TYPE':
      return {
        ...state,
        ...state.type[action.index].isActive = !state.type[action.index].isActive
      }
    case 'FILTER_CLICK_HEIGHT':
      return {
        ...state,
        ...state.height[action.index].isActive = !state.height[action.index].isActive
      }
    case 'FILTER_CLICK_WEIGHT':
      return {
        ...state,
        ...state.weight[action.index].isActive = !state.weight[action.index].isActive
      }
    case 'FILTER_CLICK_FEATURE':
      return {
        ...state,
        feature:action.feature
      }
    case 'FILTER_CLICK_REGION':
      return {
        ...state,
        ...state.region[action.index].isActive = !state.region[action.index].isActive
      }
    case 'FILTER_CLICK_RESET':
      return {
        ...state,
        type:type.map(item => ({tag:item,isActive:false})),
        height:height.map(item => ({tag:item,isActive:false})),
        weight:weight.map(item => ({tag:item,isActive:false})),
        feature:null,
        region:region.map(item => ({tag:item.value,isActive:false}))
      }
    default:
      return state
  }
}
const detailFetch = (state = {data:[]}, action) => {
    switch (action.type) {
      case  'DETAIL_FETCH':
        return {
          ...state,
          data:action.data
        }
      case 'EMPTY_DETAIL_DATA':
        return {
          ...state,
          data:[]
        }
      default:
        return state
    }
  }

const reducer = combineReducers({
  fetch,
  loadingDisplay,
  filter,
  detailFetch
})

export default reducer
