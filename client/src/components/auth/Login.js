import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { login } from '../../actions/auth';
import { Input } from '../common/Input';
import backgroundImage from './image/loginBackground.png';
import loginImage from './image/login.png';
import PasswordInput from '../common/PasswordInput';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  box-sizing: border-box;
  color: gray;
  border-radius: 4px;
  /* margin-top: 20%; */
`;

const BackgroundImage = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  height: 80vh;
  max-height: 100vh;
  color: white;
  padding: 5%;
`;

const TextContainer = styled.div`
  padding: 3%;
  width: 100%;
  max-width: 400px;
  float: right;
  text-align: left;
  height: 500px;
  margin-top: -80px;
`;

const SigninContainer = styled.div`
  float: left;
  width: 100%;
  max-width: 400px;
`;

const SignIn = styled.h2`
  padding: 16px 16px 16px 16px;
  margin-top: 40%;
  color: #bfbdbc;
  font-size: 2em;
`;

const Paragraph = styled.p`
  padding: 1px 16px 16px 16px;
  color: #bfbdbc;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  color: #f16350;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: bold;
`;

const Title = styled.h1`
  padding: 16px 16px 1px 16px;
  margin-top: 10%;
  font-size: 3em;
  font-weight: bold;
  color: white;
  font-size: 4em;
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
        <TextContainer>
          <Title>
            <i className='fas fa-terminal'></i>
            code
            <span style={{ color: '#F16350' }}>D</span>esign
          </Title>
          <Paragraph>
            Join CodeDesign's community and find designers and/or developers to
            work with or new projects to work on
          </Paragraph>
          <Paragraph>
            Create a free acount and start sharing your work, apply for jobs,
            browse community portfolios and connect with other users
          </Paragraph>
          <Paragraph>
            <span style={{ color: '#F16350' }}>-------</span>
          </Paragraph>
        </TextContainer>
        <SigninContainer>
          <SignIn className='large text-primary'>Sign In</SignIn>
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
        </SigninContainer>
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
