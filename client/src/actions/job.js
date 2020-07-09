import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  JOB_ERROR,
  DELETE_JOB,
  ADD_JOB,
  GET_JOB,
  GET_PROFILE
} from './types';

//get posts
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/job');
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

//remove post
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

//add post
export const addJob = formData => async dispatch => {
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
    // history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get post
export const getJob = id => async dispatch => {
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
