import React, { Component } from "react";
import EventdetailChats from "./EventdetailChats";
import Eventdetailheader from "./Eventdetailheader";
import Eventdetailinfo from "./Eventdetailinfo";
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
    return {
      event
    };
  }
};

class EventdetailPage extends Component {
  async componentDidMount() {
    const { firestore, history, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push("/events");
      toastr.error("No", "Event Not Found");
    }
  }
  render() {
    const { event } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
      console.log(event)
    return (
      <Grid>
        <Grid.Column width={10}>
          <Eventdetailheader event={event} />
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
