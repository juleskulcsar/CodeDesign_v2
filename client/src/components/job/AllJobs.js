import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';

const AllJobsContainer = styled.div`
  position: relative;
  top: 5em;
  width: 60%;
  margin: 0 auto;
`;

const AllJobs = ({ auth, getJobs, job: { jobs, _id, user, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return loading ? (
    <Spinner />
  ) : (
      <AllJobsContainer>
        {jobs.data.map(job => (
          <div key={job._id}>
            <JobItem key={job._id} job={job} size={true} />
          </div>
        ))}
      </AllJobsContainer>
    );
};

AllJobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});
export default connect(mapStateToProps, { getJobs })(AllJobs);
