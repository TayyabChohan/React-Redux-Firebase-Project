import React, { Component } from 'react';
import  EventDashBoard  from '../../features/event/EventDashboard/EventDashboard.jsx'
import  HomePage  from '../../features/Home/HomePage.jsx'
import  EventDetailpage  from '../../features/event/EventDetail/EventDetailpage.jsx'
import  PeopleDashBoar  from '../../features/user/PeopleDashBoard/PeopleDashBoar.jsx'
import  userDetailPage  from '../../features/user/UserDetail/userDetailPage.jsx'
import  SettingDashBoard  from '../../features/user/Settings/SettingDashBoard.jsx'
import  EventForm  from '../../features/event/EventForm/EventForm.jsx'
import  NavBar  from '../../features/nav/navbar/NavBar.jsx'
import  {Container  } from 'semantic-ui-react'
import { Route ,Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      
      <div>
        <Switch>
        <Route exact path="/" component={HomePage} /> 
        </Switch>

        <Route path="/(.+)" render={()=>(
          <div>
          <NavBar/>
        
        <Container className='main'>
        <Switch>
         
         <Route path="/events" component={EventDashBoard} />
         <Route path="/event/:id" component={EventDetailpage} />
         <Route path="/people" component={PeopleDashBoar} />
         <Route path="/profile/:id" component={userDetailPage} />
         <Route path="/setings" component={SettingDashBoard} />
         <Route path="/createEvent" component={EventForm} />
         </Switch>
      </Container>
     
      </div>


        )}  />  
      </div>
      
        
    );
  }
}

export default App;
