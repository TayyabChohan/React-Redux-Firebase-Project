import React, { Component } from 'react'
import  EventItem  from './EventItem'

 class EventList extends Component {
  render() {

    const {Events,  DeleteEvent}=this.props;
    return (
      <div>
        
         {Events.map((event)=>(
           
           <EventItem key={event.id} event={event} 
             DeleteEvent={DeleteEvent}  />

         ))}
    
      </div>
    )
  }
}

export default EventList;