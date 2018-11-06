import { DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './eventConstant'
import { asyncactionstart,asyncactionerror,asyncactionfinish } from '../async/asyncAction'
import { fetchsampledate } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr'
import { createNewEvent } from '../../app/common/util/helpers'

export const creatEvent=event=>{
   return async(dispatch, getState, {getFirestore})=>{
           const firestore=getFirestore();
           const user = firestore.auth().currentUser;
           const photoURL= getState().firebase.profile.photoURL;
           let newEvent=createNewEvent(user, photoURL,event); 

       try{
          let createdEvent= await firestore.add('events', newEvent);
          await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,{
              eventId:createdEvent.id,
              userId:user.uid,
              eventDate:event.date,
              host:true

          })

        toastr.success('Success','Event Has Been Created')
    } 
       catch(error){
           toastr.error('OOPS', 'Someting Went Wrong')
       }
   }}


export const DeleteEvent=(eventid)=>{
    return{
        type: DELETE_EVENT,
        payload: {eventid}
    }
}
export const updateEvent=(event)=>{
    return async dispatch=>{
        try{
            dispatch({
             type: UPDATE_EVENT,
             payload: {event}
         });
         toastr.success('Success','Event Has Been Updated')
     } 
        catch(error){
            toastr.error('OOPS', 'Someting Went Wrong')
        }
    }
}
export const fetchevents =(events)=>{
    return{type:FETCH_EVENT,
        payload:events
        
    }
}

export const loadevents=()=>{
    return async dispatch=>{
       try{
           dispatch(asyncactionstart())
           let events=await fetchsampledate();
           dispatch(fetchevents(events))
           dispatch(asyncactionfinish())
       }
       catch(error){
           dispatch(asyncactionerror())

       }
    }
}