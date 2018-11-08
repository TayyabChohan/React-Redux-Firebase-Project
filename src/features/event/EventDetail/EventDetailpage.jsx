import React, { Component } from "react";
import Eventdetailheader from "./Eventdetailheader";
import Eventdetailinfo from "./Eventdetailinfo";
import EventdetailChats from "./EventdetailChats";
import EventdetailSidebar from "./EventdetailSidebar";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { objectToArray } from "../../../app/common/util/helpers";
const mapState = state => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return { 
    event,
    auth: state.firebase.auth
   };
};
class EventdetailPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push("/events");
      toastr.error("Sorry", "Event not found!");
    }
  }

  render() {
    const { event, auth } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
      const isHost=event.hostUid===auth.uid;
      const isGiong=attendees && attendees.some(a => a.id===auth.uid) 
    return (
      <Grid>
        <Grid.Column width={10}>
          <Eventdetailheader event={event}  isHost={isHost} isGiong={isGiong} />
          <Eventdetailinfo event={event} />
          <EventdetailChats />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventdetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState)(EventdetailPage));