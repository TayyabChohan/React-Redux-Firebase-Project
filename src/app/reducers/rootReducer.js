import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testArea/testReducer';
import  EventReducer from '../../features/event/EventReducer'

const rootReducer = combineReducers({
  events:EventReducer,
  test: testReducer,
  form: FormReducer
})

export default rootReducer