import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import CreateProfile from '../profile-form/CreateProfile';
import profilePhotoDefault from './image/profilephoto.png';
import { Button } from '../common/Button';
import {
  ProfileTopDiv,
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer,
  ProfileTop,
  RoundImage,
  Anchor,
  H4Styled,
  Paragraph
} from '../common/Edit-Create-Profile';

const SocialIcons = styled.div`
  > a {
    position: relative;
    color: #8e8c89;
    text-decoration: none;
    padding-bottom: 0.5em;
  }
  > a:hover {
    color: #ad4d2a;
  }
  > a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #8e8c89;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  > a:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log('profile in dashboard: ', profile);

  let image = profilePhotoDefault;
  // profile.profile.profilePhoto ? image = profile.profile.profilePhoto : image = profilePhotoDefault

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
              <ProfileTop>
                <ProfileTopDiv>
                  {profile.profilePhoto !== null ? (
                    <RoundImage src={profile.profilePhoto} alt='' />
                  ) : (
                    <RoundImage src={image} alt='' />
                  )}
                </ProfileTopDiv>
                <ProfileTopDiv name='true'>
                  <H4Styled name='true'>{user.name}</H4Styled>
                  <Paragraph>{profile.specialties} </Paragraph>
                  <Paragraph>
                    {profile.location && <span>{profile.location}</span>}
                  </Paragraph>
                  {profile.website && (
                    <Anchor
                      href={profile.website}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {profile.website}
                    </Anchor>
                  )}
                </ProfileTopDiv>
              </ProfileTop>
              <ProfileBottomDiv>
                {profile.bio && (
                  <div>
                    <Paragraph about='true'>About:</Paragraph>
                    <Paragraph>{profile.bio}</Paragraph>
                  </div>
                )}
                {profile.social && (
                  <SocialIcons>
                    {profile.website && (
                      <Anchor
                        href={profile.website}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fas fa-globe fa-2x' />
                      </Anchor>
                    )}
                    {profile.social && profile.social.twitter && (
                      <Anchor
                        href={profile.social.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fab fa-twitter fa-2x' />
                      </Anchor>
                    )}
                    {profile.social && profile.social.facebook && (
                      <Anchor
                        href={profile.social.facebook}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fab fa-facebook fa-2x' />
                      </Anchor>
                    )}
                    {profile.social && profile.social.linkedin && (
                      <Anchor
                        href={profile.social.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fab fa-linkedin fa-2x' />
                      </Anchor>
                    )}
                    {profile.social && profile.social.youtube && (
                      <Anchor
                        href={profile.social.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fab fa-youtube fa-2x' />
                      </Anchor>
                    )}
                    {profile.social && profile.social.instagram && (
                      <Anchor
                        href={profile.social.instagram}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='fab fa-instagram fa-2x' />
                      </Anchor>
                    )}
                  </SocialIcons>
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
