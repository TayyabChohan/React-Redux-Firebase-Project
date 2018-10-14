import { LOGIN_USER, SIGN_OUT_USER } from './AuthConstant'
import { createReducer } from '../../app/common/util/reducerUtil'
export const loginUser=(state, payload)=>{
    return{
    ...state,
    authenticated:true,
    currentUser:payload.creds.email
    }
}
export const signOutUser=(state, payload)=>{
    return{
        ...state,
        authenticated:false,
        currentUser:{}
    }
}
const initialstate={
    currentUser:{}
}

export default createReducer(initialstate,
    {[LOGIN_USER]:loginUser,
    [SIGN_OUT_USER]:signOutUser
    }
    
    )