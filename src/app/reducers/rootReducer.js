import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import testReducer from '../../features/testArea/testReducer';
import  EventReducer from '../../features/event/EventReducer'
import modalReducer from '../../features/Modal/modalReducer'
import  AuthReducer from '../../features/auth/AuthReducer';
import asyncReducer from '../../features/async/asyncReducer';
import {firebaseReducer  } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


const rootReducer = combineReducers({
  firebase:firebaseReducer,
  firestore:firestoreReducer,
  events:EventReducer,
  test: testReducer,
  form: FormReducer,
  modals:modalReducer,
  auth:AuthReducer,
  async:asyncReducer,
  toastr:toastrReducer

})

export default rootReducer