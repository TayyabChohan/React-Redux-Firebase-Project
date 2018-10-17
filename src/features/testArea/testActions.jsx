import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_FINISH, COUNTER_ACTION_STARTED } from './testConstants';


export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
}
export const counteractionstart=()=>{
  return{
    type: COUNTER_ACTION_STARTED
  }
}
export const counteractionFinish=()=>{
  return{
    type:COUNTER_ACTION_FINISH
  }
}


const delay=(ms)=>{
  return new Promise(resolve=> setTimeout(resolve,ms))
  
}
export const incrementCounterasych=()=>{
  return async dispatch=>{
    dispatch(counteractionstart())
    await delay(1000)
    dispatch({type:INCREMENT_COUNTER})
    dispatch(counteractionFinish())
  }
}


export const DecremenrCounterasych=()=>{
  return async dispatch=>{
    dispatch(counteractionstart())
    await delay(1000)
    dispatch({type:DECREMENT_COUNTER})
    dispatch(counteractionFinish())
  }
}