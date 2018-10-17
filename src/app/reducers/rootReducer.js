import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testArea/testReducer';
import  EventReducer from '../../features/event/EventReducer'
import modalReducer from '../../features/Modal/modalReducer'
import  AuthReducer from '../../features/auth/AuthReducer';
import asyncReducer from '../../features/async/asyncReducer'

const rootReducer = combineReducers({
  events:EventReducer,
  test: testReducer,
  form: FormReducer,
  modals:modalReducer,
  auth:AuthReducer,
  async:asyncReducer
})

export default rootReducer