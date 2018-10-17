import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import  EventList  from '../eventList/EventList'
import { connect } from 'react-redux'
import { DeleteEvent } from '../EventAction'
import LoadingComponent  from '../../../app/layout/LoadingComponent'

const mapState=(state)=>({
  events:state.events,
  loading:state.async.loading
  })
  const actions={
    DeleteEvent
    
  }
 class EventDashboard extends Component {
    
handleDeleteEvent=(eventId)=>()=>{
  this.props.DeleteEvent(eventId);
}


  render() {
    const {events, loading}=this.props;
    if(loading) return <LoadingComponent inverted={true} />
    return (
      
      <Grid>  
        <Grid.Column width={10}>
            <EventList  DeleteEvent={this.handleDeleteEvent}
              Events={events}/>
        </Grid.Column>

        <Grid.Column width={6} >
       
        </Grid.Column>

        </Grid>  
    );
    } 
}

export default connect(mapState,actions)(EventDashboard);
