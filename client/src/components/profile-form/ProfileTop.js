import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getCurrentProfile } from '../../actions/profile';
import {
  ProfileTopDiv,
  ProfileTop,
  RoundImage,
  Anchor,
  H4Styled,
  Paragraph
} from '../common/Edit-Create-Profile';
import profilePhotoDefault from '../dashboard/image/profilephoto.png';
import Spinner from '../layout/Spinner';

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

const ProfileTopSection = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let image = profilePhotoDefault;
  console.log('profile: ', profile);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <ProfileTop>
        <ProfileTopDiv>
          {profile.profilePhoto !== null ? (
            <RoundImage src={profile.profilePhoto} alt='' />
          ) : (
            <RoundImage src={image} alt='' />
          )}
        </ProfileTopDiv>
        <ProfileTopDiv name='true'>
          <H4Styled>{user.name}</H4Styled>
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
    </>
  );
};

ProfileTop.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
  ProfileTopSection
);
