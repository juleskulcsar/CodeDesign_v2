import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PASSWORD_UPDATE_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  UPDATE_SUCCESS
} from './types';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//register user
export const register = ({
  name,
  email,
  registeras,
  password
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, registeras, password });
  try {
    const res = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'danger'));
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//update user details
export const updateDetails = (
  { name, email, registeras },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, registeras });
  try {
    const res = await axios.put('/api/auth/updatedetails', body, config);

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors));
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//update user details
export const updateUserPassword = (
  { currentPassword, newPassword, confirmNewPassword },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    currentPassword,
    newPassword,
    confirmNewPassword
  });

  try {
    const res = await axios.put('/api/auth/updatepassword', body, config);

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    history.push('/dashboard');
    dispatch(setAlert('password updated successfully'));
  } catch (err) {
    const errors = err.response.data.error;
    if (err) {
      dispatch(setAlert(errors));
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PASSWORD_UPDATE_FAIL,
      payload: errors
    });
  }
};

//login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config, {
      validateStatus: false
    });

    console.log('res: ', res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: true
      // payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//logout / clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
