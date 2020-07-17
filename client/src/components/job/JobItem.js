import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link as RouterDomLink } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';
import styled, { css } from 'styled-components';
import { deleteJob } from '../../actions/job';
import { Button } from '../common/Button';
import {
  Paragraph,
  StyledLink,
  H4Styled,
  RoundImage
} from '../common/Edit-Create-Profile';
import {
  JobItemContainer,
  JobItemBottom,
  JobDescriptionDiv,
  JobItemLeftContainer,
  JobItemRightContainer
} from '../common/JobItemContainer';

const Link = ({ isActive, children, ...props }) => {
  return <RouterDomLink {...props}>{children}</RouterDomLink>;
};
const UserDetails = styled.div`
  display: block;
  padding-left: 3em;
  @media (max-width: 768px) {
      padding-left: 1em;
    }
`

const JobItem = ({
  job: { jobs, _id, title, description, jobType, location, user, date, profile, loading },
  size,
  locationDetails,
  extended
}) => {

  const MAX_LENGTH = 150;
  return loading ? (
    <Spinner />
  ) : (extended === true ? (
    <>
      <JobItemContainer details={true}>
        <JobItemLeftContainer details={true}>
          <Link to={`/user/${user}`}>
            <RoundImage details={true} src={profile.profilePhoto} alt='' />
          </Link>
          <UserDetails>
            <Paragraph details={true}>{profile.displayName}</Paragraph>
            <Paragraph >{profile.location}</Paragraph>
            <Paragraph>{profile.website}</Paragraph>
          </UserDetails>
        </JobItemLeftContainer>
        <JobItemRightContainer details={true}>
          <H4Styled>{title}</H4Styled>
          {locationDetails ? (
            <>
              <Paragraph>job type - {' '} <span style={{ color: '#AD4D2A', fontWeight: 'bold' }}>{' '}{jobType}</span></Paragraph>
              <Paragraph>location - {' '} <span style={{ color: '#AD4D2A', fontWeight: 'bold' }}>{' '}{location}</span></Paragraph>
            </>
          ) : null}
          <JobDescriptionDiv>
            {ReactHtmlParser(ReactHtmlParser(description))}
          </JobDescriptionDiv>
          <JobItemBottom>
            <Paragraph>
              <span style={{ color: '#8E8C89' }}>
                {' '}
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
              </span>
            </Paragraph>
          </JobItemBottom>
        </JobItemRightContainer>
      </JobItemContainer>
    </>
  ) : (
      <>
        <JobItemContainer>
          <JobItemLeftContainer>
            <Link to={`/user/${user}`}>
              <RoundImage src={profile.profilePhoto} alt='' />
            </Link>
            <Paragraph>{profile.displayName}</Paragraph>
          </JobItemLeftContainer>
          <JobItemRightContainer>
            <H4Styled>{title}</H4Styled>
            {locationDetails ? (
              <>
                <Paragraph>job type: {jobType}</Paragraph>
                <Paragraph>location: {location}</Paragraph>
              </>
            ) : null}
            <JobDescriptionDiv>
              {ReactHtmlParser(ReactHtmlParser(description)).slice(0, MAX_LENGTH)}
              ....
            <StyledLink to={`/job/${_id}`}>more </StyledLink>
            </JobDescriptionDiv>
            <JobItemBottom>
              <Paragraph>
                <span style={{ color: '#8E8C89' }}>
                  {' '}
                  Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </span>
              </Paragraph>
            </JobItemBottom>
          </JobItemRightContainer>
        </JobItemContainer>
      </>
    ));
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteJob
})(JobItem);
