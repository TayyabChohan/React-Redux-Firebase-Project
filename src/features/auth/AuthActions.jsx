import { LOGIN_USER, SIGN_OUT_USER } from './AuthConstant'
import { closeModal } from '../Modal/modalActions';

export const login=(creds)=>{
    return dispatch=>{
        dispatch({type:LOGIN_USER, payload:{creds}})
        dispatch(closeModal())
    }
}
export const signOut=()=>{
    return{
        type:SIGN_OUT_USER
    }
}
