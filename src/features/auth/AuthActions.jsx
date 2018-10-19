import { SIGN_OUT_USER } from './AuthConstant'
import { closeModal } from '../Modal/modalActions';
import { SubmissionError } from 'redux-form'; 

export const login=(creds)=>{
    return async (dispatch, getState, {getFirebase})=>{
        const firebase= getFirebase();
        try{
             await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
            dispatch(closeModal())
        }
        catch(error){
             console.log(error)
             throw new SubmissionError({
               _error:error.message
             });
        }     
    };
};
export const signOut=()=>{
    return{
        type:SIGN_OUT_USER
    }
}
