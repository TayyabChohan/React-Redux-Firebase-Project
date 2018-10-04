import { combineReducers } from 'redux';
import testReducer from '../../features/testArea/testReducer';
import  EventReducer from '../../features/event/EventReducer'

const rootReducer = combineReducers({
  events:EventReducer,
  test: testReducer
})

export default rootReducer