import { createReducer } from '../../app/common/util/reducerUtil'
import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from './asyncConstant'
const initialstate={
    loading:false
}
export const async_actionstart=(state, payload)=>{
return{
         ...state,loading:true
}
}


export const async_actionfinish=(state, payload)=>{
    return{
             ...state,loading:false
    }
    }
    
export const async_actionerror=(state, payload)=>{
    return{
             ...state,loading:false
    }
    }
    export default createReducer(initialstate,{
    [ASYNC_ACTION_START]:async_actionstart,
    [ASYNC_ACTION_FINISH]:async_actionfinish,
    [ASYNC_ACTION_ERROR]:async_actionerror
    })