import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import  EventList  from '../eventList/EventList'
import { connect } from 'react-redux'
import { DeleteEvent , updateEvent,creatEvent} from '../EventAction'
 class EventDashboard extends Component {
    
handleDeleteEvent=(eventId)=>()=>{
  this.props.DeleteEvent(eventId);
}


  render() {
    return (
      
      <Grid>  
        <Grid.Column width={10}>
            <EventList  DeleteEvent={this.handleDeleteEvent}
              Events={this.props.events}/>
        </Grid.Column>

        <Grid.Column width={6} >
       
        </Grid.Column>

        </Grid>

      
    );
    } 
}
const mapState=(state)=>({
events:state.events
})
const actions={
  DeleteEvent
  
}
export default connect(mapState,actions)(EventDashboard);
