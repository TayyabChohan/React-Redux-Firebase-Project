import React, { Component } from 'react';
import  EventDashBoard  from '../../features/event/EventDashboard/EventDashboard.jsx'
import  HomePage  from '../../features/Home/HomePage.jsx'
import EventDetailedPage from '../../features/event/EventDetail/EventDetailedPage'
import  PeopleDashBoar  from '../../features/user/PeopleDashBoard/PeopleDashBoar.jsx'
import  UserDetailedPage  from '../../features/user/UserDetailed/UserDetailedPage.jsx'
import  SettingDashBoard  from '../../features/user/Settings/SettingDashBoard.jsx'
import  EventForm  from '../../features/event/EventForm/EventForm.jsx'
import  NavBar  from '../../features/nav/navbar/NavBar.jsx'
import  {Container  } from 'semantic-ui-react'
import { Route ,Switch } from 'react-router-dom'
import  testComponent  from '../../features/testArea/TestComponent'
import ModalManager from '../../features/Modal/ModalManager'
import { UserIsAuthenticated } from '../../features/auth/authWrapper'
import NotFound from '../../app/layout/NotFound';


class App extends Component {
  render() {
    return (
      
      <div>
        <ModalManager/>
        <Switch>
        <Route exact path="/" component={HomePage} /> 
        </Switch>

        <Route path="/(.+)" render={()=>(
          <div>
          <NavBar/>
        
        <Container className='main'>
        <Switch>
        <Route path="/testComponent" component={testComponent} />          
         <Route path="/events" component={EventDashBoard} />
         <Route path="/event/:id" component={EventDetailedPage} />
         <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
         <Route path="/people" component={UserIsAuthenticated(PeopleDashBoar)} />
         <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)} />
         <Route path="/Settings" component={UserIsAuthenticated(SettingDashBoard)} />
         <Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
         <Route path="/error" component={NotFound} />
         </Switch>
      </Container>
     
      </div>


        )}  />  
      </div>
      
        
    );
  }
}

export default App;
