import React from 'react'
import { Menu, Image,Dropdown } from 'semantic-ui-react'
import { NavLink , Link } from 'react-router-dom'

const SignedinMenue = ({signOut , currentUser}) => {
  return (
        <Menu.Item position="right">
          <Image avatar spaced="right" src='/assets/user.png' />
          <Dropdown pointing="top left" text={currentUser}>
            <Dropdown.Menu>
              <Dropdown.Item text="Create Event" icon="plus" />
              <Dropdown.Item text="My Events" icon="calendar" />
              <Dropdown.Item text="My Network" icon="users" />
              <Dropdown.Item text="My Profile" icon="user" />
              <Dropdown.Item as={Link} to='/Settings' text="Settings" icon="settings" />
              <Dropdown.Item onClick={signOut} as={NavLink} to="/"  text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
  )
}

export default SignedinMenue
