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
import Modal from './Modal';
import ImageUpload from '../fileuploader/ImageUpload';

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

  const {
    website,
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
          <Modal show={isShowing} close={closeModalHandler}></Modal>
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
          <ProfileTopSection profile={profile} />
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
                  {user.registeras === 'developer' ? (
                    <StyledSelect
                      name='specialties'
                      value={specialties}
                      onChange={e => onChange(e)}
                    >
                      <option value='0'>* Select specialties</option>
                      <option value='Developer'>Developer</option>
                      <option value='Student or Learning'>
                        Student or Learning
                      </option>
                      <option value='Instructor'>Instructor or Teacher</option>
                      <option value='Intern'>Intern</option>
                      <option value='Other'>Other</option>
                    </StyledSelect>
                  ) : (
                    <StyledSelect
                      name='specialties'
                      value={specialties}
                      onChange={e => onChange(e)}
                    >
                      <option value='0'>* select specialties</option>
                      <option value='Designer'>Designer</option>
                      <option value='Student or Learning'>
                        Student or Learning
                      </option>
                      <option value='Instructor'>Instructor or Teacher</option>
                      <option value='Intern'>Intern</option>
                      <option value='Other'>Other</option>
                    </StyledSelect>
                  )}
                  <small>
                    Give us an idea of where you are at in your career
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
                  />
                  <small>City & state suggested (eg. Boston, MA)</small>
                </StyledDiv>
                <StyledDiv>
                  <Input
                    type='text'
                    placeholder='* skills'
                    name='skills'
                    value={skills}
                    onChange={e => onChange(e)}
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
