/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent, cancellTogle } from "../EventAction";
import { withFirestore } from 'react-redux-firebase'
import  {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import Placeinput from "../../../app/common/form/Placeinput";
import Script  from 'react-load-script'
import {composeValidators, combineValidators,isRequired,hasLengthGreaterThan } from "revalidate";

const validate= combineValidators({
  title:isRequired({message:'The Event Title is Required'}),
  category:isRequired({message:'Please Provide Category'}),
  description:composeValidators(isRequired({message:'Please Enter Description'}),
     hasLengthGreaterThan(4)({message:'Description needs to be at least 5 charactor'})
  )(),
  city:isRequired('city'),
  venue:isRequired('venue'),
  date:isRequired('date')

})

const mapState = (state) => {
  
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event
  };
};
const actions = {
  createEvent,
  updateEvent,
  cancellTogle
};



const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];
class EventForm extends Component {
  state={
    cityLatLng:{},
    venueLatLng:{},
    scriptLaoded:false
  }
  async componentDidMount(){
       const {firestore, match}=this.props
        await firestore.setListener(`events/${match.params.id}`) 
  }
  async componentWillUnmount(){
    const {firestore, match}=this.props;
    await firestore.unsetListener(`events/${match.params.id}`)
  }
  handleCitySelection=(selectedCity)=>{
   geocodeByAddress(selectedCity)
   .then(results=>getLatLng(results[0]))
    .then(LatLng=>{
      this.setState({
        cityLatLng:LatLng
      });
    })   
    .then(()=>{
      this.props.change('city', selectedCity)
    })    
  }
  handleVenueSelection=(selectedVenue)=>{
    geocodeByAddress(selectedVenue)
    .then(results=>getLatLng(results[0]))
     .then(LatLng=>{
       this.setState({
         venueLatLng:LatLng
       });
     })   
     .then(()=>{
       this.props.change('venue', selectedVenue)
     })    
       }

  handleScriptLoad=()=>this.setState({scriptLaoded:true});
  onFormSubmit = Values => {
    Values.venueLatLng=this.state.venueLatLng
    if (this.props.initialValues.id) {
      if(Object.keys(Values.venueLatLng).length===0){
      Values.venueLatLng=this.props.event.venueLatLng
      }
      this.props.updateEvent(Values);
      this.props.history.goBack();
    } else {
      console.log(Values)
      this.props.createEvent(Values);
      this.props.history.push("/events");
    }
      
  };

  render() {
    const {invalid,submitting, pristine, event, cancellTogle }=this.props;
    return (
      <Grid>
        <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqe2Hx0D8PX6MdqaIXKQvxr_ysHwj-I04&libraries=places"
        onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>   
          <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color="teal" content="Event Details" />
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                options={category}
                component={SelectInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={Placeinput}
                options={{ types:['(cities)']}}
                placeholder="Event City"
                onSelect={this.handleCitySelection}
              />
              {this.state.scriptLaoded &&
              <Field
                name="venue"
                type="text"
                component={Placeinput}
                options={{
                  location:new google.maps.LatLng(this.state.cityLatLng),
                  radius:1000,
                  types:['establishment']
                }}
                placeholder="Event Venue"
                onSelect={this.handleVenueSelection}
              />
              }
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date And Time Event"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              <Button
              onClick={()=>cancellTogle(!event.cancelled, event.id)}
              type="Button" 
              color={event.cancelled? 'green':'red'}
              content={event.cancelled? 'Reactivate Event' :'Cancel Event'}
              floated='right'
              
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default withFirestore(connect(
  mapState,
  actions
)(reduxForm({ form: "EventForm",enableReinitialize:true , validate })(EventForm)));
