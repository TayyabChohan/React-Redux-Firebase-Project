import { FETCH_EVENT } from "./eventConstant";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncAction";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";
import moment from "moment";
import firebase from "../../app/config/firebase";

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firestore = getFirestore();
      const user = firestore.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;
      const newEvent = createNewEvent(user, photoURL, event);
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success("Success!", "Event has been created");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", error.message);
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      if (event.date !== getState().firestore.ordered.events[0].date) {
        event.date = moment(event.date.toDate());
      }
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.success("Oops", "Something went wrong");
    }
  };
};

export const cancellTogle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const message = cancelled
    ? "Are you sure you want to cancel the event ?"
    : "This will reactivate the event -are you sure?";
  try {
    const firestore = getFirestore();
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    toastr.error("sorry", error);
  }
};

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  const today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventRefs = firestore.collection("events");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore
        .collection("events")
        .doc(lastEvent.id)
        .get());
    let query;
    lastEvent
      ? (query = eventRefs
           .where("date", "<", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventRefs
            .where("date", "<", today)
          .orderBy("date")
          .limit(2));
    const querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENT, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

//export const addEventComment = (eventId,parentId ,values) =>
//async (dispatch, getState,{getFirebase})=>{
  //const firebase=getFirebase();
  //const profile=getState().firebase.profile;
  //const user=firebase.auth().currentUser;
  //let newComment={
    //parentId:parentId,
    //displayName: profile.displayName,
    //photoURL: profile.photoURL || '/assets/user.png',
    //uid:user.uid,
    //text: values.comment,
    //date:Date.now()
  //}
  //try{
    // await firebase.push(`event_chat/${eventId}`, newComment);
  //}
  //catch(error)
  //{
//console.log(error)
//toastr.error('Oops','problem in adding Comment')
  //}
//}



export const addEventComment = (eventId, values, parentId) => 
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      parentId: parentId,
      displayName: profile.displayName,
      photoURL: profile.photoURL || '/assets/user.png',
      uid: user.uid,
      text: values.comment,
      date: Date.now()
    }
    try {
      await firebase.push(`event_chat/${eventId}`, newComment)
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Problem adding comment')
    }
  }