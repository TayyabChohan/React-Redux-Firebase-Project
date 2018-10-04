import React, { Component } from 'react'
import {Grid,Button} from 'semantic-ui-react'
import  EventList  from '../eventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid'
import { connect } from 'react-redux'
import { DeleteEvent , updateEvent,creatEvent} from '../EventAction'
 class EventDashboard extends Component {
   
state={
IsOpen:false,
EventSelected:null
}

 handleForm=()=>{
this.setState({
IsOpen:true,
EventSelected:null

})}

 CancelForm=()=>{
  this.setState({
  IsOpen:false
  
  }) }
handleEventAdit=(eventUpdetedform)=>()=>{
  this.setState({
    EventSelected:eventUpdetedform,
    IsOpen:true

  })

}
  handlenewEvent=(newEvent)=>{
  newEvent.id=cuid();
  newEvent.hostPhotoURL='../assets/user.png';
  this.props.creatEvent(newEvent);
  this.setState({
       
       IsOpen:false
  })

}
handUpdateEvent=(updatedEvent)=>{
  this.props.updateEvent(updatedEvent);
  this.setState({
   
    IsOpen:false,EventSelected:null
  })
} 
handleDeleteEvent=(eventId)=>()=>{
  this.props.DeleteEvent(eventId);
}


  render() {
    return (
      
      <Grid>  
        <Grid.Column width={10}>
            <EventList  DeleteEvent={this.handleDeleteEvent}
             selectedAditEvent={this.handleEventAdit}
              Events={this.props.events}/>
        </Grid.Column>

        <Grid.Column width={6} >
        <Button  onClick={this.handleForm} positive content="Create Event"/>
        {this.state.IsOpen && 
        <EventForm onUpdateEvent={this.handUpdateEvent} 
        selectedAditEvent={this.state.EventSelected} 
         newcreatEvent={this.handlenewEvent} cancalFormEvent={this.CancelForm}/> }
            
        </Grid.Column>

        </Grid>

      
    );
    } 
}
const mapState=(state)=>({
events:state.events
})
const actions={
  DeleteEvent,
  creatEvent,
  updateEvent
}
export default connect(mapState,actions)(EventDashboard);
