import React, { Component } from 'react';
import  {Container  } from 'semantic-ui-react'
import { Route ,Switch } from 'react-router-dom'
import { UserIsAuthenticated } from '../../features/auth/authWrapper'
import   Loadable  from 'react-loadable';
import LoadingComponent from '../../app/layout/LoadingComponent';

const AsyncHomePage= Loadable({
loader:()=>import('../../features/Home/HomePage.jsx'),
loading:LoadingComponent
})

const AsyncEventForm= Loadable({
  loader:()=>import('../../features/event/EventForm/EventForm.jsx'),
  loading:LoadingComponent
  })
  const AsyncNavBar= Loadable({
    loader:()=>import('../../features/nav/navbar/NavBar.jsx'),
    loading:LoadingComponent
    })
    const AsyncEventDashBoard = Loadable({
      loader:()=>import('../../features/event/EventDashboard/EventDashboard.jsx'),
      loading:LoadingComponent
      })
      const AsyncSettingDashBoard= Loadable({
        loader:()=>import('../../features/user/Settings/SettingDashBoard'),
        loading:LoadingComponent
        })
        const AsyncUserDetailedPage = Loadable({
          loader: () => import('../../features/user/UserDetailed/UserDetailedPage.jsx'),
          loading: LoadingComponent
        })
        const AsyncPeopleDashboard = Loadable({
          loader: () => import('../../features/user/PeopleDashBoard/PeopleDashBoar.jsx'),
          loading: LoadingComponent
        })
        const AsyncEventDetailedPage = Loadable({
          loader: () => import('../../features/event/EventDetail/EventDetailedPage'),
          loading: LoadingComponent
        })
        const AsyncModalManager = Loadable({
          loader: () => import('../../features/Modal/ModalManager'),
          loading: LoadingComponent
        })
        const AsyncNotFound = Loadable({
          loader: () => import('../../app/layout/NotFound'),
          loading: LoadingComponent
        })
        

class App extends Component {
  render() {
    return (
      
      <div>
        <AsyncModalManager/>
        <Switch>
        <Route exact path="/" component={AsyncHomePage} /> 
        </Switch>

        <Route path="/(.+)" render={()=>(
          <div>
          <AsyncNavBar/>
        
        <Container className='main'>
        <Switch>         
         <Route path="/events" component={AsyncEventDashBoard} />
         <Route path="/event/:id" component={AsyncEventDetailedPage} />
         <Route path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)} />
         <Route path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
         <Route path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailedPage)} />
         <Route path="/Settings" component={UserIsAuthenticated( AsyncSettingDashBoard)} />
         <Route path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
         <Route path="/error" component={AsyncNotFound} />
         <Route  component={AsyncNotFound} />
         </Switch>
      </Container>
     
      </div>


        )}  />  
      </div>
      
        
    );
  }
}

export default App;









