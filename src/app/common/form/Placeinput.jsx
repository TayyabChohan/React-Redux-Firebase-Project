 import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import Script  from 'react-load-script'
import PlacesAutocomplete from 'react-places-autocomplete'
const styles={
     autocompleteContainer:{
         zIndex:1000
     }
}


 class Placeinput extends Component {
 state={
     scriptLaoded:false 
 }
 handleScriptLoad=()=>this.setState({scriptLaoded:true});
 
  render() {
const {input, width,onSelect,placeholder,options, meta:{touched , error}}=this.props;

    return (
      <Form.Field error={touched && !! error} width={width} >
        <Script
        url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCDXHD4V410byBQEmewGkZl0rwhd6olbD0&libraries=places'
        onLoad={this.handleScriptLoad}
        /> 
        {this.state.scriptLaoded && 
          <PlacesAutocomplete
          inputProps={{...input , placeholder}}
          onSelect={onSelect}
          options={options}
          styles={styles}
          />
        }
          {touched && error && <Label basic color="red">{error} </Label>}
          
      </Form.Field>
    );
  
    }
}
export default Placeinput
