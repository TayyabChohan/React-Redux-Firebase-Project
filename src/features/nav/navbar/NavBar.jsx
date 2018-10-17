import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link , withRouter } from 'react-router-dom'
import SignedoutMenue from "../Menues/SignedoutMenue";
import SignedinMenue from "../Menues/SignedinMenue";
import {openModal} from '../../Modal/modalActions';
import { connect } from 'react-redux';
import { signOut } from '../../auth/AuthActions'
const actions={
  openModal,
  signOut
}

const mapState=(state)=>({
      auth:state.auth
})

class NavBar extends Component {

  onhandleSignIn=()=>{
    this.props.openModal('LoginModal')
  }
  onhandleregister=()=>{
    this.props.openModal('RegisterModal')
  }

  onhandleSignOut=()=>{
   this.props.signOut();
    this.props.History.push("/");
  }

  render() {
    const {auth}=this.props;
    const authenticated=auth.authenticated
    return (
      
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events"  name="Events" />
            <Menu.Item as={NavLink} to="/testComponent"  name="Test" />
            
            {
              authenticated && <Menu.Item as={NavLink} to="/people"  name="people"/>
            }
            
            <Menu.Item>
              {auth && <Button 
              as={Link} to={"/createEvent"}
                floated="right"
                positive
                inverted
                content="Create Event"/> }
              

            </Menu.Item>
            {authenticated ? <SignedinMenue currentUser={auth.currentUser} signOut={this.onhandleSignOut}/> :
             <SignedoutMenue signIn={this.onhandleSignIn} register={this.onhandleregister} />}
           
          </Container>
        </Menu>
      
    );
  }
}
export default withRouter(connect(mapState, actions)(NavBar));
