import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';
import { getJob } from '../../actions/job';
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
  width: 80%;
  margin: 0 auto;
`;

const Job = ({ getJob, job: { job, loading }, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return loading || job === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <JobContainer>
        <StyledLink to='/jobs'>all jobs</StyledLink>
        <JobItem locationDetails={true} job={job} size={false} />
      </JobContainer>
    </Fragment>
  );
};

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJob })(Job);
