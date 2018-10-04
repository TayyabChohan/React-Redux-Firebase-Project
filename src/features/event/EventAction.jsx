import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstant'

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