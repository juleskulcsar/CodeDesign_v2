import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';
import { getJob, getJobs } from '../../actions/job';
import styled from 'styled-components';
import { Paragraph, StyledLink, H4Styled } from '../common/Edit-Create-Profile';

const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  max-width: 800px;
  position: relative;
  top: 5em;
  width: 60%;
  margin: 0 auto;
`;

const Job = ({ getJobs, getJob, job: { jobs, job, loading }, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return loading || job === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <JobContainer>
          <StyledLink details='true' to='/jobs'>back to job-board</StyledLink>
          <JobItem
            extended={true}
            locationDetails={true}
            job={job}
            size={false}
          />
        </JobContainer>
      </Fragment>
    );
};

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJobs, getJob })(Job);
