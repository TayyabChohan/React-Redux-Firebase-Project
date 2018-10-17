import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './eventConstant'
import { asyncactionstart,asyncactionerror,asyncactionfinish } from '../async/asyncAction'
import { fetchsampledate } from '../../app/data/mockApi';

export const creatEvent=(event)=>{
    return{
        type: CREATE_EVENT,
        payload: {event}
    }
}

export const DeleteEvent=(eventid)=>{
    return{
        type: DELETE_EVENT,
        payload: {eventid}
    }
}
export const updateEvent=(event)=>{
    return{
        type: UPDATE_EVENT,
        payload: {event}
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