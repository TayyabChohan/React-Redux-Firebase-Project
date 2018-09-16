import React, { Component } from 'react'
import {Grid,Button} from 'semantic-ui-react'
import  EventList  from '../eventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid'


const Eventboard = [
  {
    id: '1',
    title: 'Tayyab Chohan',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


 class EventDashboard extends Component {

state={
Events:Eventboard,
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
  const upDatedEvent=[...this.state.Events, newEvent];
  this.setState({
       Events:upDatedEvent,
       IsOpen:false
  })

}
handUpdateEvent=(updatedEvent)=>{
  this.setState({
    Events:this.state.Events.map((event)=>{
      if(this.state.Events.id===updatedEvent.id){
        return Object.assign({},updatedEvent);
      }else{
        return event
      }
    }),IsOpen:false,EventSelected:null
  })
} 
handleDeleteEvent=(eventId)=>()=>{
const updateddelete=this.state.Events.filter(e=> e.id!== eventId );
this.setState({
             Events:updateddelete
})
}


  render() {
    return (
      
      <Grid>  
        <Grid.Column width={10}>
            <EventList  DeleteEvent={this.handleDeleteEvent}
             selectedAditEvent={this.handleEventAdit}
              Events={this.state.Events}/>
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
export default EventDashboard;
