import {
  GET_JOBS,
  JOB_ERROR,
  DELETE_JOB,
  ADD_JOB,
  GET_JOB,
  CLEAR_JOB
} from '../actions/types';

const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false
      };
    case CLEAR_JOB:
      return {
        ...state,
        job: null,
        repos: [],
        loading: false
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== payload),
        loading: false
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
