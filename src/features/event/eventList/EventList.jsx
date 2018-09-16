import React, { Component } from 'react'
import  EventItem  from './EventItem'

 class EventList extends Component {
  render() {

    const {Events, selectedAditEvent , DeleteEvent}=this.props;
    return (
      <div>
        <h1>Event List</h1>
         {Events.map((event)=>(
           
           <EventItem key={event.id} event={event} 
           selectedAditEvent={selectedAditEvent}  DeleteEvent={DeleteEvent}  />

         ))}
    
      </div>
    )
  }
}

export default EventList;