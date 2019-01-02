import React from 'react'
import { Menu, Image,Dropdown } from 'semantic-ui-react'
import { NavLink , Link } from 'react-router-dom'


const SignedinMenue = ({signOut , profile, auth}) => {
  return (
        <Menu.Item position="right">
          <Image avatar spaced="right" src={profile.photoURL ||'/assets/user.png'} />
          <Dropdown pointing="top left" text={profile.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={"/createEvent"} text="Create Event" icon="plus" />
              <Dropdown.Item as={NavLink} to="/events" text="My Events" icon="calendar" />
              <Dropdown.Item as={NavLink} to="/people" text="My Network" icon="users" />
              <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
              <Dropdown.Item as={Link} to='/Settings' text="Settings" icon="settings" />
              <Dropdown.Item onClick={signOut} as={NavLink} to="/"  text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
  )
}

export default SignedinMenue
