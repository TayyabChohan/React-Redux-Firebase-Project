import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from 'react-redux'
import { creatEvent, updateEvent } from '../EventAction'
import cuid  from 'cuid'

const mapState=(state, ownProps)=>{
const Eventid=ownProps.match.params.id;
let event={
  title: "",
  date: "",
  City: "",
  venue: "",
  HostedBy: ""
};
if(Eventid && state.events.length >0){
  event=state.events.filter(event=>event.id === Eventid)[0]
}

return {
  event
}
}
const actions={
  creatEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

 
  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();

    } else {
      const newEvent={
        ...this.state.event,
        id:cuid(),
        hostPhotoURL:"/assets/user.png"

      }
      this.props.creatEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    
    const { event } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              onChange={this.onInputChange}
              value={event.title}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              onChange={this.onInputChange}
              value={event.date}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.onInputChange}
              value={event.city}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              onChange={this.onInputChange}
              value={event.venue}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              onChange={this.onInputChange}
              value={event.hostedBy}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default connect(mapState, actions)(EventForm);
