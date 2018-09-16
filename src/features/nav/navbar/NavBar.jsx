import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from 'react-router-dom'
import SignedoutMenue from "../Menues/SignedoutMenue";
import SignedinMenue from "../Menues/SignedinMenue";

class NavBar extends Component {
  state={
    authenticated:false
  }

  onhandleSignIn=()=>{
    this.setState({
      authenticated:true
    })
  }

  onhandleSignOut=()=>{
    this.setState({
      authenticated:false
    })
  }

  render() {
    const {authenticated}=this.state;
    return (
      
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events"  name="Events" />
            <Menu.Item as={NavLink} to="/people"  name="people" />
            <Menu.Item>
              <Button 
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>
            {authenticated ? <SignedinMenue signOut={this.onhandleSignOut}/> :
             <SignedoutMenue signIn={this.onhandleSignIn}/>}
           
          </Container>
        </Menu>
      
    );
  }
}
export default NavBar;
