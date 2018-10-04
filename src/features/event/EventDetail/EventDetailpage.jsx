import React from "react";
import EventdetailChats from "./EventdetailChats";
import Eventdetailheader from "./Eventdetailheader";
import Eventdetailinfo from "./Eventdetailinfo";
import EventdetailSidebar from "./EventdetailSidebar";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux'

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



const EventdetailPage = ({event}) => {
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
};

export default connect(mapState)(EventdetailPage);
