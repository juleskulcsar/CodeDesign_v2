import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';
import {
  Paragraph
} from '../common/SignIn-SignUp';
import { SwitchLabel, Slider, CheckBoxInput } from '../common/CheckBox'

const AllJobsContainer = styled.div`
  position: relative;
  top: 5em;
  width: 60%;
  margin: 0 auto;
`;

const AllJobs = ({ history, auth, getJobs, job: { jobs, _id, user, loading } }) => {

  let filters = {}
  const [filterParams, setFilterparams] = useState(filters)
  const [remoteCheck, setRemoteCheck] = useState(true)
  const [onLocationCheck, setOnLocationCheck] = useState(true)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    getJobs();
  }, [getJobs]);


  const remoteClickHandler = () => {
    setRemoteCheck(!remoteCheck)
    setChecked(!checked)
    if (remoteCheck === true) {
      setOnLocationCheck(true)
      filters.jobType = 'remote'
      setFilterparams(filters);
      getJobs(filters);
    } else {
      delete filters.jobType;
      setFilterparams(filters);
      getJobs(filters);
    }
  }

  const onLocationClickHandler = () => {
    setOnLocationCheck(!onLocationCheck)
    if (onLocationCheck === true) {
      setRemoteCheck(true)
      setChecked(false)
      filters.jobType = 'on location'
      setFilterparams(filters)
      getJobs(filters);
    } else {
      delete filters.jobType;
      setFilterparams(filters)
      getJobs(filters);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
      <AllJobsContainer>
        <Paragraph>only remote jobs</Paragraph>
        <SwitchLabel>
          <CheckBoxInput type="checkbox" checked={checked} onClick={remoteClickHandler} />
          <Slider round={true}></Slider>
        </SwitchLabel>
        <Paragraph>only on location jobs</Paragraph>
        <SwitchLabel>
          <CheckBoxInput type="checkbox" onClick={onLocationClickHandler} />
          <Slider round={true}></Slider>
        </SwitchLabel>

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
export default connect(mapStateToProps, { getJobs })(withRouter(AllJobs));
