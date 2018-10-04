import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link , withRouter } from 'react-router-dom'
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
    this.props.History.push("/");
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
            <Menu.Item as={NavLink} to="/testComponent"  name="Test" />
            
            {
              authenticated && <Menu.Item as={NavLink} to="/people"  name="people"/>
            }
            
            <Menu.Item>
              {this.state.authenticated && <Button 
              as={Link} to={"/createEvent"}
                floated="right"
                positive
                inverted
                content="Create Event"/> }
              

            </Menu.Item>
            {authenticated ? <SignedinMenue signOut={this.onhandleSignOut}/> :
             <SignedoutMenue signIn={this.onhandleSignIn}/>}
           
          </Container>
        </Menu>
      
    );
  }
}
export default withRouter(NavBar);
