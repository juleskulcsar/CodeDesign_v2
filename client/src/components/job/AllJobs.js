import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';
import { SwitchLabel, Slider, CheckBoxInput } from '../common/CheckBox';
import {
  LeftContainer,
  RightContainer,
  Paragraph
} from '../common/Edit-Create-Profile';
import { StyledFiltersList, StyledFiltersUl } from '../common/Filters'

const AllJobsContainer = styled.div`
  position: relative;
  top: 5em;
  width: 75%;
  margin: 0 auto;
  color: white;
  /* padding: 5%; */
  display: flex; 
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  position: relative;
  top: 3em;
  text-align: center;
`
const PageTitle = styled.h1`
  display: inline-block;
  font-size: 2em;
  color: #EFEEED;
`


const AllJobs = ({ history, auth, getJobs, job: { jobs, _id, user, loading } }) => {

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  let filters = {}
  const [filterParams, setFilterparams] = useState(filters)
  const [remoteCheck, setRemoteCheck] = useState(true)
  const [onLocationCheck, setOnLocationCheck] = useState(true)
  const [remoteChecked, setRemoteChecked] = useState(false)
  const [locationChecked, setLocationChecked] = useState(false)

  const [designCheck, setDesignCheck] = useState(true)
  const [developmentCheck, setDevelopmentCheck] = useState(true)
  const [designChecked, setDesignChecked] = useState(false)
  const [developmentChecked, setDevelopmentChecked] = useState(false)


  console.log('filters: ', filters)


  const remoteClickHandler = () => {
    setRemoteCheck(!remoteCheck)
    setRemoteChecked(!remoteChecked)
    if (remoteCheck === true) {
      setOnLocationCheck(true)
      setLocationChecked(false)
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
    setLocationChecked(!locationChecked)
    if (onLocationCheck === true) {
      setRemoteCheck(true)
      setRemoteChecked(false)
      filters.jobType = 'on location'
      setFilterparams(filters)
      getJobs(filters);
    } else {
      delete filters.jobType;
      setFilterparams(filters)
      getJobs(filters);
    }
  }

  const designClickHandler = () => {
    setDesignCheck(!designCheck)
    setDesignChecked(!designChecked)
    if (designCheck === true) {
      setDevelopmentCheck(true)
      setDevelopmentChecked(false)
      filters.jobField = 'design'
      setFilterparams(filters);
      getJobs(filters);
    } else {
      delete filters.jobField;
      setFilterparams(filters);
      getJobs(filters);
    }
  }

  const developmentClickHandler = () => {
    setDevelopmentCheck(!developmentCheck)
    setDevelopmentChecked(!developmentChecked)
    if (developmentCheck === true) {
      setDesignCheck(true)
      setDesignChecked(false)
      filters.jobField = 'development'
      setFilterparams(filters)
      getJobs(filters);
    } else {
      delete filters.jobField;
      setFilterparams(filters)
      getJobs(filters);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
      <>
        <TitleWrapper>
          <PageTitle>Find your next <span style={{ color: '#F16350' }}>job</span>!</PageTitle>
        </TitleWrapper>
        <AllJobsContainer>
          <LeftContainer filters={true}>
            <StyledFiltersUl>
              <StyledFiltersList>
                <Paragraph filters={true}>remote </Paragraph>
                <SwitchLabel>
                  <CheckBoxInput
                    type="checkbox"
                    checked={remoteChecked}
                    onClick={remoteClickHandler} />
                  <Slider
                    isChecked={remoteChecked}
                    round={true}></Slider>
                </SwitchLabel>
              </StyledFiltersList>
              <StyledFiltersList>
                <Paragraph filters={true}>on location </Paragraph>
                <SwitchLabel>
                  <CheckBoxInput
                    type="checkbox"
                    checked={locationChecked}
                    onClick={onLocationClickHandler} />
                  <Slider round={true}></Slider>
                </SwitchLabel>
              </StyledFiltersList>
              <StyledFiltersList>
                <Paragraph filters={true}>design </Paragraph>
                <SwitchLabel>
                  <CheckBoxInput
                    type="checkbox"
                    checked={designChecked}
                    onClick={designClickHandler} />
                  <Slider round={true}></Slider>
                </SwitchLabel>
              </StyledFiltersList>
              <StyledFiltersList>
                <Paragraph filters={true}>development </Paragraph>
                <SwitchLabel>
                  <CheckBoxInput
                    type="checkbox"
                    checked={developmentChecked}
                    onClick={developmentClickHandler} />
                  <Slider round={true}></Slider>
                </SwitchLabel>
              </StyledFiltersList>
            </StyledFiltersUl>
          </LeftContainer>
          <RightContainer >
            {jobs.data.map(job => (
              <div key={job._id}>
                <JobItem key={job._id} job={job} size={true} />
              </div>
            ))}
          </RightContainer>
        </AllJobsContainer>
      </>
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
