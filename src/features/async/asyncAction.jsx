import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from './asyncConstant'

export const asyncactionstart=()=>{
    return{
        type:ASYNC_ACTION_START
    }
}
export const asyncactionfinish=()=>{
    return{
        type:ASYNC_ACTION_FINISH
    }
}
export const asyncactionerror=()=>{
    return{
        type:ASYNC_ACTION_ERROR
    }
}

