import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  JOB_ERROR,
  DELETE_JOB,
  ADD_JOB,
  GET_JOB,
  GET_PROFILE,
  CLEAR_JOB
} from './types';

//get jobs
export const getJobs = (filter) => async dispatch => {
  try {
    const res = await axios.get('/api/job', {
      params: filter
    });
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//remove job
export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/job/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: id
    });
    dispatch(setAlert('job deleted', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//add job
export const addJob = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/job', formData, config);
    dispatch({
      type: ADD_JOB,
      payload: res.data
    });
    dispatch(setAlert('job created', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get job
export const getJob = id => async dispatch => {
  dispatch({ type: CLEAR_JOB });
  try {
    const res = await axios.get(`/api/job/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
