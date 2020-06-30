import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  height: 80vh;
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

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registeras: '',
    password: '',
    conformPassword: ''
  });

  const { name, email, registeras, password, confirmPassword } = formData;
  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, registeras, password });
    }
  };

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
            <H2_Styled>Sign Up</H2_Styled>
            <Form onSubmit={e => onSubmit(e)}>
              <Input
                type='text'
                placeholder='name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
                required
              />
              <Input
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
              <StyledSelect
                name='registeras'
                value={registeras}
                onChange={e => onChange(e)}
              >
                <option value='0'>* register as: </option>
                <option value='designer'>I'm a designer</option>
                <option value='developer'>I'm a developer</option>
              </StyledSelect>
              <PasswordInput
                name='password'
                placeholder='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
              />
              <PasswordInput
                name='confirmPassword'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={e => onChange(e)}
                minLength='6'
                confirmPass
              />
              <Input type='submit' value='Sign Up'></Input>
            </Form>
            <Paragraph>
              Already have an account?
              <StyledLink to='/'> Sign in</StyledLink>
            </Paragraph>
          </FormContainer>
        </Container>
      </BackgroundImage>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
