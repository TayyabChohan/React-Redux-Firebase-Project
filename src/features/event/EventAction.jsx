import {  FETCH_EVENT } from "./eventConstant";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncAction";
import firebase from '../../app/config/firebase';
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";
import moment from "moment";

export const creatEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add("events", newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userId: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success("Success", "Event Has Been Created");
    } catch (error) {
      toastr.error("OOPS", "Someting Went Wrong");
    }
  };
};


export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }

    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success", "Event Has Been Updated");
    } catch (error) {
      toastr.error("OOPS", "Someting Went Wrong");
    }
  };
};


export const eventGetForDashboard = (lastEvent) =>
  async (dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventRef = firestore.collection('events');

    try {
      dispatch(asyncActionStart())
      let startAfter = lastEvent && await firestore.collection('events').docs(lastEvent.id).get();
      let query;
      lastEvent ? query = eventRef.where('date', '>=', today).orderBy('date').startAfter(startAfter).limit(2)
        : query = eventRef.where('date', '>=', today).orderBy('date').limit(2)

      let QuerySnaps = await query.get();
      if(QuerySnaps.docs.length===0){
        dispatch(asyncActionFinish());
        return;
        
      }
      console.log(QuerySnaps)
      let events = [];
      for (let i = 0; i < QuerySnaps.docs.length; i++) {
        let evt = { ...QuerySnaps.docs[i].data(), id: QuerySnaps.docs[i].id }
        events.push(evt);
      }
      dispatch({ type: FETCH_EVENT, payload: { events } })
      dispatch(asyncActionFinish())
      return QuerySnaps;
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }

export const cancellTogle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const massege = cancelled
    ? "Are you Sure To CAncel This Event "
    : "This Will Reactivate The Event- Are You Sure";
  try {
    toastr.confirm(massege, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};
