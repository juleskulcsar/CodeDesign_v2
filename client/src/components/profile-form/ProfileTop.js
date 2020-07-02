import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const ProfileTopSection = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let image = profilePhotoDefault;

  return (
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
