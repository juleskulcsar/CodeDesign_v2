import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProfileTopSection from '../profile-form/ProfileTop';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import CreateProfile from '../profile-form/CreateProfile';
import { Button } from '../common/Button';
import {
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer,
  Anchor,
  Paragraph,
  H4Styled
} from '../common/Edit-Create-Profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <Container>
            <LeftContainer>
              <DashboardActions />
              <Button deleteAccount onClick={() => deleteAccount()}>
                delete account
              </Button>
            </LeftContainer>
            <RightContainer>
              <ProfileTopSection profile={profile} />
              <ProfileBottomDiv>
                {profile.bio && (
                  <div>
                    <H4Styled about='true'>About:</H4Styled>
                    <Paragraph>{profile.bio}</Paragraph>
                  </div>
                )}
                {profile.skills && (
                  <div>
                    {profile.skills.map((skill, index) => (
                      <Paragraph key={index}>
                        <i className='fas fa-check' /> {skill}
                      </Paragraph>
                    ))}
                  </div>
                )}
              </ProfileBottomDiv>
            </RightContainer>
          </Container>
        </Fragment>
      ) : (
        <Fragment>
          <CreateProfile />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
