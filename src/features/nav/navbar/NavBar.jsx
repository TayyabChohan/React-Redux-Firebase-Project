import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link , withRouter } from 'react-router-dom'
import { withFirebase } from 'react-redux-firebase'
import SignedoutMenue from "../Menues/SignedoutMenue";
import SignedinMenue from "../Menues/SignedinMenue";
import {openModal} from '../../Modal/modalActions';
import { connect } from 'react-redux';
const actions={
  openModal,
  
}

const mapState=(state)=>({
      auth:state.firebase.auth,
      profile:state.firebase.profile
})

class NavBar extends Component {

  onhandleSignIn=()=>{
    this.props.openModal('LoginModal')
  }
  onhandleregister=()=>{
    this.props.openModal('RegisterModal')
  }

  onhandleSignOut=()=>{
   this.props.firebase.logout();
    this.props.History.push("/");
  }

  render() {
    const {auth, profile}=this.props;
    const authenticated=auth.isLoaded && !auth.isEmpty;
    return (
      
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="assets/logo.png" alt="logo" />
              YouChat
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events"  name="Events" />
            
            {
              authenticated && <Menu.Item as={NavLink} to="/people"  name="people"/>
            }
            
            <Menu.Item>
              {auth&& authenticated && <Button 
              as={Link} to={"/createEvent"}
                floated="right"
                positive
                inverted
                content="Create Event"/> }
              

            </Menu.Item>
            {authenticated ? <SignedinMenue auth={auth} profile={profile} signOut={this.onhandleSignOut}/> :
             <SignedoutMenue signIn={this.onhandleSignIn} register={this.onhandleregister} />}
           
          </Container>
        </Menu>
      
    );
  }
}
export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
