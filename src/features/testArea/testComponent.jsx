import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { incrementCounterasych, DecremenrCounterasych } from './testActions'
import { openModal } from '../../features/Modal/modalActions'
const mapState = (state) => ({
  data:state.test.data,
  loading:state.test.loading
})

const actions = {
  DecremenrCounterasych,
  incrementCounterasych,
  openModal
}
 
class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state ={
    adress:'',
    scriptLoaded:false
  }
  handleScriptLoad =()=>{
    this.setState({scriptLoaded:true})
  }


  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  onChange =(address)=>this.setState({address});
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange}

    const {incrementCounterasych, DecremenrCounterasych, data ,loading, openModal} = this.props;
    return (
      <div>
        <Script
        url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCDXHD4V410byBQEmewGkZl0rwhd6olbD0&libraries=places'
        onLoad={this.handleScriptLoaded}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementCounterasych} color='green' content='Increment' />
        <Button  loading={loading} onClick={DecremenrCounterasych} color='red' content='Decrement' />
        <Button onClick={()=>openModal('TestModal', {data:43})} color='teal' content='Open Model' />
         <br/>
         <br/>
         <form onSubmit={this.handleFormSubmit}>
         {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} /> }
        
        <button type="submit">Submit</button>
      </form>
      
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)