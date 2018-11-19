import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { DeleteEvent } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  events: state.firestore.ordered.events,
  
});
const actions = {
  DeleteEvent
};
class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.DeleteEvent(eventId);
  };

  render() {
    const { events} = this.props;
    if (!isLoaded(events)|| isEmpty(events)) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList DeleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
