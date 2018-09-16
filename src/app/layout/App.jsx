import React, { Component } from 'react';
import  EventDashBoard  from '../../features/event/EventDashboard/EventDashboard.jsx'
import  NavBar  from '../../features/nav/navbar/NavBar'
import  {Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      
      <div>
        
        <NavBar/>
        <Container className='main'>
         <Route path="/event" component={EventDashBoard} />
      </Container>
      </div>
        
    );
  }
}

export default App;
