import React, { Fragment, useState, useEffect } from 'react';
//import withRouter so we can redirect user using history object
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile,
  deleteAccount
} from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from './ProfileTop';
import styled from 'styled-components';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import { Form, FormContainer } from '../common/SignIn-SignUp';
import {
  RequiredText,
  StyledSelect,
  StyledDiv,
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer
} from '../common/Edit-Create-Profile';
import ProfilePhotoModal from './ProfilePhotoModal';
import ImageUpload from '../fileuploader/ImageUpload';
import { getNotificationsByUser } from '../../actions/notification';

const BackDrop = styled.div`
  background-color: rgba(28, 27, 26, 0.52);
  height: 100%;
  position: fixed;
  transition: all 1.3s;
  width: 100%;
  height: 100vh;
  text-align: center;
  z-index: 500;
`;

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  auth: { user }
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    displayName: '',
    location: '',
    specialties: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    profilePhoto: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      registeras: loading || !profile.registeras ? '' : profile.registeras,
      profilePhoto:
        loading || !profile.profilePhoto ? '' : profile.profilePhoto,
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      displayName: loading || !profile.displayName ? '' : profile.displayName,
      location: loading || !profile.location ? '' : profile.location,
      specialties: loading || !profile.specialties ? '' : profile.specialties,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);
  // useEffect(() => {
  //   getNotificationsByUser(user)
  // })

  const {
    website,
    displayName,
    location,
    specialties,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    profilePhoto
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
    history.go(0);
  };
  const openModalHandler = e => {
    e.preventDefault();
    setIsShowing(true);
  };
  const closeModalHandler = () => {
    setIsShowing(false);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        {isShowing ? (
          <BackDrop>
            <ProfilePhotoModal
              show={isShowing}
              close={closeModalHandler}
            ></ProfilePhotoModal>
          </BackDrop>
        ) : null}
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
              <FormContainer createProfilePage='true'>
                <RequiredText>
                  <small>
                    <span style={{ color: '#8E8C89' }}>* = required fields</span>
                  </small>
                </RequiredText>
                <Form onSubmit={e => onSubmit(e)}>
                  <Button onClick={openModalHandler}>
                    change profile picture
                </Button>
                  <StyledDiv>
                    <Input
                      type='text'
                      name='registeredAs'
                      value={user.registeras}
                      readOnly
                    />
                  </StyledDiv>
                  <StyledDiv>
                    {user.registeras === 'developer' ? (
                      <StyledSelect
                        name='specialties'
                        value={specialties}
                        onChange={e => onChange(e)}
                        required
                      >
                        <option value='0'>* Select specialties</option>
                        <option value='FrontEnd Developer'>FrontEnd Developer</option>
                        <option value='Backend Developer'>Backend Developer</option>
                        <option value='FullStack Developer'>FullStack Developer</option>
                        <option value='Software Engineer'>Software Engineer</option>
                        <option value='Mobile Developer'>Mobile Developer</option>
                        <option value='Graphics Developer'>Graphics Developer</option>
                        <option value='Game Developer'>Game Developer</option>
                        <option value='Data Scientist'>Data Scientist</option>
                        <option value='Big Data Developer'>Big Data Developer</option>
                        <option value='DevOps Developer'>DevOps Developer</option>
                        <option value='Security Developer'>Security Developer</option>
                      </StyledSelect>
                    ) : (
                        <StyledSelect
                          name='specialties'
                          value={specialties}
                          onChange={e => onChange(e)}
                          required
                        >
                          <option value='0'>* select specialties</option>
                          <option value='Graphic Designer'>Graphic Designer</option>
                          <option value='UI/UX Designer'>UI/UX Designer</option>
                          <option value='Mobile Designer'>Mobile Designer</option>
                          <option value='Web Designer'>Web Designer</option>
                          <option value='Product Designer'>Product Designer</option>
                          <option value='Illustrator'>Illustrator</option>
                          <option value='Brand Designer'>Brand Designer</option>
                          <option value='Animation Designer'>Animation Designer</option>
                          <option value='Motion Graphics Designer'>Motion Graphics Designer</option>
                        </StyledSelect>
                      )}
                    <small>
                      Give us an idea of where you are at in your career
                  </small>
                  </StyledDiv>
                  <StyledDiv>
                    <Input
                      type='text'
                      placeholder='display name'
                      name='displayName'
                      value={displayName}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                      How you want your name to be displayed
                  </small>
                  </StyledDiv>
                  <StyledDiv>
                    <Input
                      type='text'
                      placeholder='Website'
                      name='website'
                      value={website}
                      onChange={e => onChange(e)}
                    />
                    <small>Could be your own or a company website</small>
                  </StyledDiv>
                  <StyledDiv>
                    <Input
                      type='text'
                      placeholder='* location'
                      name='location'
                      value={location}
                      onChange={e => onChange(e)}
                      required
                    />
                    <small>City & state suggested (eg. Boston, MA)</small>
                  </StyledDiv>
                  <StyledDiv>
                    <Input
                      type='text'
                      placeholder='* skills'
                      name='skills'
                      value={skills.toLowerCase()}
                      onChange={e => onChange(e)}
                      required
                    />
                    <small>
                      Please use comma separated values (eg.
                      HTML,CSS,JavaScript,PHP)
                  </small>
                  </StyledDiv>
                  <StyledDiv>
                    <Input
                      type='text'
                      placeholder='github username'
                      name='githubusername'
                      value={githubusername}
                      onChange={e => onChange(e)}
                    />
                    <small>
                      If you want your latest repos and a Github link, include
                      your username
                  </small>
                  </StyledDiv>
                  <StyledDiv>
                    <Textarea
                      placeholder='add bio'
                      name='bio'
                      value={bio}
                      onChange={e => onChange(e)}
                    ></Textarea>
                    <small>Tell us a little about yourself</small>
                  </StyledDiv>
                  <StyledDiv>
                    <Button
                      onClick={() => toggleSocialInputs(!displaySocialInputs)}
                      type='button'
                      className='btn btn-light'
                    >
                      Add Social Network Links
                  </Button>
                    <small>Optional</small>
                  </StyledDiv>

                  {displaySocialInputs && (
                    <Fragment>
                      <StyledDiv>
                        <Input
                          type='text'
                          placeholder='twitter URL'
                          name='twitter'
                          value={twitter}
                          onChange={e => onChange(e)}
                        />
                      </StyledDiv>
                      <StyledDiv>
                        <Input
                          type='text'
                          placeholder='facebook URL'
                          name='facebook'
                          value={facebook}
                          onChange={e => onChange(e)}
                        />
                      </StyledDiv>
                      <StyledDiv>
                        <Input
                          type='text'
                          placeholder='youtube URL'
                          name='youtube'
                          value={youtube}
                          onChange={e => onChange(e)}
                        />
                      </StyledDiv>
                      <StyledDiv>
                        <Input
                          type='text'
                          placeholder='linkedin URL'
                          name='linkedin'
                          value={linkedin}
                          onChange={e => onChange(e)}
                        />
                      </StyledDiv>
                      <StyledDiv>
                        <Input
                          type='text'
                          placeholder='instagram URL'
                          name='instagram'
                          value={instagram}
                          onChange={e => onChange(e)}
                        />
                      </StyledDiv>
                    </Fragment>
                  )}
                  <Input
                    type='submit'
                    value='save changes'
                    submitProfile='true'
                  />
                </Form>
              </FormContainer>
            </ProfileBottomDiv>
          </RightContainer>
        </Container>
      </Fragment>
    );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
