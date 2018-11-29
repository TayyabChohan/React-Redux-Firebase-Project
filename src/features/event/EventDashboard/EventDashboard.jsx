import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { getEventsForDashboard } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
};

class EventDashBoard extends Component {
  state = {
    moreEvents: false,
    loadingInitial:true,
    loadedEvents:[]
  };
  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial:false
      });
    }
  }
  componentWillReceiveProps(nextProps){
  if(this.props.events!==nextProps.events){
    this.setState({
    loadedEvents:[...this.state.loadedEvents, ...nextProps.events]
    })
  }
  }
  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };
  render() {
    const { loading } = this.props;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList  events={this.state.loadedEvents} onEventDelete={this.handleDeleteEvent} />
          <Button
            loading={loading} 
            onClick={this.getNextEvents}
            disabled={!this.state.moreEvents}
            content="More"
            color="green"
            floated="right"
          />
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
)(firestoreConnect([{ collection: "events" }])(EventDashBoard));