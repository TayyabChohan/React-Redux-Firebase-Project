import React, { Component } from "react";
import Eventdetailheader from "./Eventdetailheader";
import Eventdetailinfo from "./Eventdetailinfo";
import EventdetailChats from "./EventdetailChats";
import EventdetailSidebar from "./EventdetailSidebar";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import { goingToEvent } from '../../user/userAction'
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
const actions={
goingToEvent
}
class EventdetailPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
     await firestore.setListener(`events/${match.params.id}`);
    
  }
  async componentWillUnmount(){
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth , goingToEvent } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
      const isHost=event.hostUid===auth.uid;
      const isGiong=attendees && attendees.some(a => a.id===auth.uid) 
    return (
      <Grid>
        <Grid.Column width={10}>
          <Eventdetailheader event={event}  isHost={isHost} isGiong={isGiong} goingToEvent={goingToEvent} />
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

export default withFirestore(connect(mapState, actions)(EventdetailPage));