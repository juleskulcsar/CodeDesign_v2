import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { login } from '../../actions/auth';
import { Input } from '../common/Input';
import {
  H2_Styled,
  Paragraph,
  Title,
  Form,
  TextContainer,
  FormContainer,
  Container
} from '../common/SignIn-SignUp';
import backgroundImage from './image/loginBackground.png';
import PasswordInput from '../common/PasswordInput';

const BackgroundImage = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  height: 100vh;
  max-height: 100vh;
  color: white;
  padding: 5%;

  @media (max-width: 780px) {
    background-image: none;
  }
`;

const StyledLink = styled(Link)`
  color: #f16350;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: bold;
`;

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <BackgroundImage>
        <Container>
          <TextContainer>
            <Title>
              code
              <span style={{ color: '#F16350' }}>D</span>esign
            </Title>
            <Paragraph>
              Join CodeDesign's community and find designers and/or developers
              to work with or new projects to work on
            </Paragraph>
            <Paragraph second>
              Create a free acount and start sharing your work, apply for jobs,
              browse community portfolios and connect with other users
            </Paragraph>
            <Paragraph>
              <span style={{ color: '#F16350' }}>-------</span>
            </Paragraph>
          </TextContainer>
          <FormContainer>
            <H2_Styled>Sign In</H2_Styled>
            <Form onSubmit={e => onSubmit(e)}>
              <Input
                type='text'
                name='email'
                placeholder='email'
                value={email}
                required
                onChange={e => onChange(e)}
              />
              <PasswordInput
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
              />
              <Input type='submit' value='Login'></Input>
            </Form>
            <Paragraph>
              Don't have an account yet?
              <StyledLink to='/register'> Sign Up</StyledLink>
            </Paragraph>
          </FormContainer>
        </Container>
      </BackgroundImage>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
