
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
export const registerUser=(user)=>
    async (dispatch , getState, {getFirebase, getFirestore})=>{
        const firestore=getFirestore();
        const firebase=getFirebase();
        try{
            //creat user in the auth
            let createdUser=await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
             console.log(createdUser);
             //update auth user profile
                await createdUser.updateProfile({
                    displayName:user.displayName
                })
                //creat New User
                let newUser={
                    displayName:user.displayName,
                    createdAt:  firestore.FieldValue.serverTimestamp()
                };
                await firestore.set(`users/${createdUser.cuid}`,{...newUser});
                dispatch(closeModal()); 
        }catch(error){
            console.log(error)
            throw new SubmissionError({
                _error:error.message
              });

        }
    }
    
