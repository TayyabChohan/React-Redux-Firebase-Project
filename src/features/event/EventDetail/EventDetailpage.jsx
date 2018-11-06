import React, { Component } from 'react'
import EventdetailChats from "./EventdetailChats";
import Eventdetailheader from "./Eventdetailheader";
import Eventdetailinfo from "./Eventdetailinfo";
import EventdetailSidebar from "./EventdetailSidebar";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'

const mapState=(state, ownProps)=>{
const eventid=ownProps.match.params.id;
let event={};
if(eventid && state.events.length>0){
  event= state.events.filter(event=>event.id===eventid)[0];
  return{
    event
  }
}
}


 class EventdetailPage extends Component {

    async componentDidMount(){
      const {firestore, match}=this.props;
      let event= await firestore.get(`events/${match.params.id}`);
      console.log(event); 
    }
  render() {
    const {event}=this.props
    return (
      <Grid>
      <Grid.Column width={10} >
      <Eventdetailheader event={event} />
      <Eventdetailinfo event={event} />
      <EventdetailChats/>
      </Grid.Column>
      <Grid.Column width={6} >
      <EventdetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
    );
  }
}



export default withFirestore(connect(mapState)(EventdetailPage));
