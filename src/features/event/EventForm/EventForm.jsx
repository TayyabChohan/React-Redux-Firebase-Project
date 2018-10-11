import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { creatEvent, updateEvent } from "../EventAction";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import  moment  from 'moment'

import {composeValidators, combineValidators,isRequired,hasLengthGreaterThan } from "revalidate";
import values from "redux-form/lib/values";

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

const mapState = (state, ownProps) => {
  const Eventid = ownProps.match.params.id;
  let event = {};
  if (Eventid && state.events.length > 0) {
    event = state.events.filter(event => event.id === Eventid)[0];
  }

  return {
    initialValues: event
  };
};
const actions = {
  creatEvent,
  updateEvent
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
  onFormSubmit = Values => {
    values.date=moment(values.date).format()
    if (this.props.initialValues.id) {
      this.props.updateEvent(Values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...Values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy:"Tayaab"
      };
      this.props.creatEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  render() {
    const {invalid,submitting, pristine }=this.props;
    return (
      <Grid>
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
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="vanue"
                type="text"
                component={TextInput}
                placeholder="Event Vanue"
              />
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
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "EventForm",enableReinitialize:true , validate })(EventForm));
