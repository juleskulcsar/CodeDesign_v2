import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from './ProfileTop';
import MyJobItem from '../job/MyJobItem';
import { Button } from '../common/Button';
import {
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer
} from '../common/Edit-Create-Profile';

const MyPosts = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const PostsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1em;
  `;

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
          <ProfileTopSection />
          <ProfileBottomDiv>
            {profile.jobs.map(job => (
              <MyJobItem
                key={job._id}
                job={job}
                size={true}
                showActions={true}
                showD={false}
              />
            ))}
          </ProfileBottomDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

MyPosts.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile
})(MyPosts);
