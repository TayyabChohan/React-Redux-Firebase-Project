import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { eventGetForDashboard } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  events: state.events,
  loading:state.async.loading
  
});
const actions = {
  eventGetForDashboard
};
class EventDashboard extends Component {
   
  componentDidMount(){
    this.props.eventGetForDashboard();
    }


  handleDeleteEvent = eventId => () => {
    this.props.DeleteEvent(eventId);
  };

  render() {
    const { events, loading} = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
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
