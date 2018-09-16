import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from 'react-router-dom'
import SignedoutMenue from "../Menues/SignedoutMenue";
import SignedinMenue from "../Menues/SignedinMenue";

class NavBar extends Component {
  render() {
    return (
      <div>
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
            <Menu.Item position="right">
           <SignedoutMenue/>
           <SignedinMenue/>
           </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}
export default NavBar;
