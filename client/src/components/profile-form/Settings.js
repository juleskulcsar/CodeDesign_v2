import React, { Fragment, useState, useEffect } from 'react';
//import withRouter so we can redirect user using history object
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadUser,
  updateDetails,
  updateUserPassword
} from '../../actions/auth';
import { deleteAccount } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from './ProfileTop';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Form, FormContainer } from '../common/SignIn-SignUp';
import {
  RequiredText,
  StyledSelect,
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer,
  Paragraph
} from '../common/Edit-Create-Profile';
import PasswordInput from '../common/PasswordInput';

const Settings = ({
  history,
  auth: { loading, user },
  updateDetails,
  updateUserPassword
}) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    registeras: ''
  });

  const [formPasswordData, setFormPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    loadUser();

    setFormData({
      registeras: loading || !user.registeras ? '' : user.registeras,
      name: loading || !user.name ? '' : user.name,
      email: loading || !user.email ? '' : user.email
    });
  }, [loading, loadUser]);

  const { registeras, name, email } = formData;
  const { currentPassword, newPassword, confirmNewPassword } = formPasswordData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPasswordChange = e => {
    setFormPasswordData({
      ...formPasswordData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateDetails(formData, history);
  };

  const onUpdate = e => {
    e.preventDefault();
    updateUserPassword(formPasswordData, history);
  };

  return loading || user === null ? (
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
            <Paragraph>update registration details</Paragraph>
            <FormContainer createProfilePage='true'>
              <RequiredText>
                <small>
                  <span style={{ color: '#8E8C89' }}>* = required fields</span>
                </small>
              </RequiredText>
              <Form>
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
                <Button
                  type='submit'
                  value='save changes'
                  onClick={e => onSubmit(e)}
                >
                  save changes
                </Button>
              </Form>
              <Paragraph>update password</Paragraph>
              <Form>
                <PasswordInput
                  name='currentPassword'
                  placeholder='current password'
                  value={currentPassword}
                  onChange={e => onPasswordChange(e)}
                  minLength='6'
                />
                <PasswordInput
                  name='newPassword'
                  placeholder='new password'
                  value={newPassword}
                  onChange={e => onPasswordChange(e)}
                  minLength='6'
                />
                <PasswordInput
                  name='confirmNewPassword'
                  placeholder='confirm new password'
                  value={confirmNewPassword}
                  onChange={e => onPasswordChange(e)}
                  minLength='6'
                  confirmPass
                />
                <Button
                  type='submit'
                  value='save new password'
                  onClick={e => onUpdate(e)}
                >
                  update password
                </Button>
              </Form>
            </FormContainer>
          </ProfileBottomDiv>
        </RightContainer>
      </Container>
    </Fragment>
  );
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  updateDetails: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser,
  updateDetails,
  updateUserPassword
})(withRouter(Settings));
