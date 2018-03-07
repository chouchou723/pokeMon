import React from 'react'
import { connect } from 'react-redux'
import { searchFetch } from '../actions'
import { Button, Input } from 'semantic-ui-react'

const Inputs = ({ dispatch, page}) => {
  let input
  let onKeyUp = (e) => {
    e.keyCode === 13 && dispatch(searchFetch(input.value))
  }
  return(
  <Input type='text' placeholder='Search...' action fluid >
    <input ref={node => {input = node}} onKeyUp={onKeyUp} />
    <Button icon= 'search' onClick={()=>dispatch(searchFetch(input.value))} />
  </Input>
  )

}

const mapStateToProps = (state) => {
  return {
    page: state.page,
    howFetch: state.howFetch
  }
}


// function * loginFlow(){//saga take监听行为,fork异步调用,cancle取消之前的行为,call同步调用
//   while(true){
//     const {user,pass} = yield take('REQ_LO');
//     const task = yield fork(api.a,user,pass);
//     const action = yield take(['LOGOUT','LOG_ERRO']);
//     if(action.type == 'LOGOUT'){
//         yield cancel (task);
//         yield call(api.clearItem('token'))
//     }
//   }
// }
export default connect(mapStateToProps)(Inputs)
