import { combineReducers } from 'redux';
import testReducer from '../../features/testArea/testreducer';

const rootReducer = combineReducers({
  test: testReducer
})

export default rootReducer