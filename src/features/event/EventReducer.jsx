import { createReducer } from '../../app/common/util/reducerUtil'
import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT ,FETCH_EVENT } from './eventConstant'

 const initialState = [];

export const creatEvent=( state, payload)=>{
    return[...state, Object.assign({}, payload.event)]
} 
export const updateEvent=(state, payload)=>{
return[...state.filter(event=>event.id !==payload.event.id), Object.assign({}, payload.event) ]

}
export const DeleteEvent=(state , payload)=>{
    return[...state.filter(event=>event.id !== payload.eventid)]

}
export const fetchEvents=(state,payload)=>{
return payload.events
}
export default createReducer(initialState, {
[CREATE_EVENT]:creatEvent,
[DELETE_EVENT]:DeleteEvent,
[UPDATE_EVENT]:updateEvent,
[FETCH_EVENT]:fetchEvents

})


