import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { toastr } from 'react-redux-toastr'
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedEvents from "./UserDetailedEvents";
import { userDetailedQueries } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents, followUser, unFollowUser } from '../userAction'


const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events:state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    following:state.firestore.ordered.following
  };
};
const action={
  getUserEvents,
  followUser,
  unFollowUser
}

class UserDetailedPage extends Component {
  componentDidMount(){
    let user=  this.props.firestore.get(`users/${this.props.match.params.id}`)
    if(!user.exists){
      toastr.error('Not Found!','This is not The Envnt You are Looking For! ');
      this.props.history.push('/error');
    }
    let events=  this.props.getUserEvents(this.props.userUid);
    console.log(events);
  }
  changeTab=(e, data)=>{
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }
  render() {
    const { profile, photos, auth, match, requesting, events, eventsLoading,followUser ,unFollowUser,following} = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = requesting[`users/${match.params.id}`]
    const isfollowing= !isEmpty(following);
    if (loading) return <LoadingComponent inverted={true} />;
    
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar unFollowUser={unFollowUser} profile={profile} followUser={followUser} isCurrentUser={isCurrentUser} isfollowing={isfollowing} />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents events={events} eventsLoading={eventsLoading} changeTab={this.changeTab} />
      </Grid>
    ); 
  }
}

export default compose(
  connect(mapState, action),
  firestoreConnect((auth, userUid) => userDetailedQueries(auth, userUid))
)(UserDetailedPage);
