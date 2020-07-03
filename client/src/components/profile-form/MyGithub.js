import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProfileGithub from '../profile/ProfileGithub';
import DashboardActions from '../dashboard/DashboardActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from './ProfileTop';
import { Button } from '../common/Button';
import {
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer
} from '../common/Edit-Create-Profile';

const MyGithub = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [loading, getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <LeftContainer>
          <DashboardActions isShowing />
          <Button deleteAccount onClick={() => deleteAccount()}>
            delete account
          </Button>
        </LeftContainer>
        <RightContainer>
          <ProfileTopSection profile={profile} />
          <ProfileBottomDiv>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </ProfileBottomDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

MyGithub.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(MyGithub);
