import React from "react";
import { Grid } from "semantic-ui-react";
import SettingNav from "./SettingNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotoPage from "./PhotoPage";
import AcountPage from "./AcountPage";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { updatePassword } from "../../auth/AuthActions";
const actions = {
  updatePassword
};

const SettingDashBoard = ({ updatePassword }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/Settings" to="/Settings/BasicPage" />
          <Route path="/Settings/BasicPage" component={BasicPage} />
          <Route path="/Settings/AboutPage" component={AboutPage} />
          <Route path="/Settings/PhotoPage" component={PhotoPage} />
          <Route
            path="/Settings/AcountPage"
            render={() => <AcountPage updatePassword={updatePassword} />}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  null,
  actions
)(SettingDashBoard);
