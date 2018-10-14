import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testArea/testReducer';
import  EventReducer from '../../features/event/EventReducer'
import modalReducer from '../../features/Modal/modalReducer'

const rootReducer = combineReducers({
  events:EventReducer,
  test: testReducer,
  form: FormReducer,
  modals:modalReducer
})

export default rootReducer