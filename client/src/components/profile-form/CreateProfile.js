import React, { Fragment, useState, useEffect } from 'react';
//import withRouter so we can redirect user using history object
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { getNotificationsByUser } from '../../actions/notification';
import { loadUser } from '../../actions/auth';
import styled from 'styled-components';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import {
  Form,
  Paragraph,
  TextContainer,
  FormContainer,
  H2Styled
} from '../common/SignIn-SignUp';
import backgroundImage from '../auth/image/loginBackground.png';

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  height: 120vh;
  color: white;
  padding: 5%;

  @media (max-width: 780px) {
    background-image: none;
  }
`;
const RequiredText = styled.p`
  padding: 0 0 0 16px;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: #f16350;
  text-decoration: none;
  font-size: 1em;
  padding: 1px 16px 16px 16px;
  line-height: 1.6;
`;

const StyledSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  color: #bfbdbc;
  :focus {
    outline: none !important;
  }
`;

const StyledDiv = styled.div`
  margin: 1.2rem 0;
`;

const Title = styled.h1`
  padding: 16px 16px 16px 16px;
  font-weight: bold;
  color: 'white';
  font-size: 3em;

  @media (max-width: 450px) {
    font-size: 2em;
  }
`;

const CreateProfile = ({ createProfile, history, auth: { user }, notification }) => {
  useEffect(() => {
    loadUser();
  }, []);

  console.log('user in create profle: ', user)
  useEffect(() => {
    getNotificationsByUser(user._id);
  }, []);

  const [formData, setFormData] = useState({
    registeredAs: user.registeras,
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

  const {
    website,
    displayName,
    registeredAs,
    location,
    specialties,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <Container>
        <TextContainer>
          <Title>Create profile</Title>
          <Paragraph>
            Let's get some information to make your profile stand out.
          </Paragraph>
          <Paragraph>
            The more information you add, the more discoverability you gain.
          </Paragraph>
          <StyledLink to='dashboard'> do this later</StyledLink>
        </TextContainer>
        <FormContainer createProfilePage>
          <H2Styled>Welcome, {user && user.name}</H2Styled>
          <RequiredText>
            <small>
              <span style={{ color: '#F16350' }}>* = required fields</span>
            </small>
          </RequiredText>
          <Form onSubmit={e => onSubmit(e)}>
            <StyledDiv>
              <Input
                type='text'
                name='registeredAs'
                value={registeredAs}
                readOnly
              />
            </StyledDiv>
            <StyledDiv>
              {user.registeras === 'developer' ? (
                <StyledSelect
                  name='specialties'
                  value={specialties}
                  onChange={e => onChange(e)}
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

              <small>Give us an idea of where you are at in your career</small>
            </StyledDiv>
            <StyledDiv>
              <Input
                type='text'
                placeholder='display name'
                name='displayName'
                value={displayName.toLowerCase()}
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
              <small className='form-text'>
                Could be your own or a company website
              </small>
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
              <small className='form-text'>
                City & state suggested (eg. Boston, MA)
              </small>
            </StyledDiv>
            <StyledDiv>
              <Input
                type='text'
                placeholder='* skills'
                name='skills'
                value={skills}
                onChange={e => onChange(e)}
                required
              />
              <small className='form-text'>
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
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
              <small className='form-text'>
                If you want your latest repos and a Github link, include your
                username
              </small>
            </StyledDiv>
            <StyledDiv>
              <Textarea
                placeholder='add bio'
                name='bio'
                value={bio}
                onChange={e => onChange(e)}
              ></Textarea>
              <small className='form-text'>
                Tell us a little about yourself
              </small>
            </StyledDiv>

            <StyledDiv>
              <Button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type='button'
                className='btn btn-light'
              >
                Add Social Network Links
              </Button>
              <small className='form-text'>Optional</small>
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

            <Input type='submit' value='submit' submitProfile />
          </Form>
        </FormContainer>
      </Container>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

export default connect(mapStateToProps, { createProfile, getNotificationsByUser })(
  withRouter(CreateProfile)
);
