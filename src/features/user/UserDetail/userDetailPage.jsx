import React, { Component } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { userDetailedQueries } from '../userQueries'


//const userDetailedHeader=({profile})=>{
// let age;
///if(profile.dateOfBirth){
// age=differenceInYears(Date.now(),profile.dateOfBirth.toDate() )
///}
//else{

//}

//}

const mapState = (state, ownProps) => {
  let userUid= null
  let profile={}
  if(ownProps.match.params.id===state.auth.id){
    profile=state.firebase.profile
  }
  else{
    profile= !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid=ownProps.match.params.id;
  }
  return{
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
}
  
};


class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image avatar size="small" src={profile.photoURL} />
                <Item.Content verticalAlign="bottom">
                  <Header as="h1">{profile.displayName || "Unkown"}</Header>
                  <br />
                  <Header as="h3">{profile.occupation || "Unkown"}</Header>
                  <br />
                  <Header as="h3">
                    27, Lives in {profile.city || "Unkown"}
                  </Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon="smile" content="About Display Name" />
                <p>
                  I am a: <strong>{profile.occupation || "Unkown"}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin || "Unkown"}</strong>
                </p>
                <p>
                  Member Since: <strong>date</strong>
                </p>
                <p>{profile.about}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon="heart outline" content="Interests" />
                {profile.interests ? (
                  <List>
                    {profile.interests &&
                      profile.interests.map((interest, index) => (
                        <Item key={index}>
                          <Icon name="heart" />
                          <Item.Content>{interest}</Item.Content>
                        </Item>
                      ))}
                  </List>
                ) : (
                  <p> NOt Interested</p>
                )}
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <Button
              as={Link}
              to="/Settings/BasicPage"
              color="teal"
              fluid
              basic
              content="Edit Profile"
            />
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="image" content="Photos" />

            <Image.Group size="small">
              {photos &&
                photos.map(photo => <Image key={photo.id} src={photo.url} />)}
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Menu secondary pointing>
              <Menu.Item name="All Events" active />
              <Menu.Item name="Past Events" />
              <Menu.Item name="Future Events" />
              <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    null
  ),
  firestoreConnect((auth, userUid) => userDetailedQueries(auth, userUid))
)(UserDetailedPage);
