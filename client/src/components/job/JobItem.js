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
import styled from 'styled-components';
import { deleteJob } from '../../actions/job';
import { Button } from '../common/Button';
import {
  Paragraph,
  StyledLink,
  H4Styled,
  RoundImage
} from '../common/Edit-Create-Profile';

const Link = ({ isActive, children, ...props }) => {
  return <RouterDomLink {...props}>{children}</RouterDomLink>;
};

const JobItemContainer = styled.div`
  border-bottom: 1px solid #55524e;
  display: flex;
  margin-top: 2em;
  flex: 1;
  @media (max-width: 768px) {
    display: block;
  }
`;

const JobItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`;

const JobDescriptionDiv = styled.div`
  color: #bfbdbc;
  line-height: 1.6;
`;

const JobItemLeftContainer = styled.div`
  justify-content: center;
  text-align: center;
`;

const JobItemRightContainer = styled.div`
  width: 100%;
`;

const JobItem = ({
  deleteJob,
  auth,
  job: { _id, title, description, jobType, location, name, avatar, user, date },
  size,
  locationDetails
}) => {
  const MAX_LENGTH = 250;
  return (
    <JobItemContainer>
      <JobItemLeftContainer>
        <Link to={`/user/${user}`}>
          <RoundImage src={avatar} alt='' />
        </Link>
        <StyledLink>
          <Paragraph>{name}</Paragraph>
        </StyledLink>
      </JobItemLeftContainer>
      <JobItemRightContainer>
        <H4Styled>{title}</H4Styled>
        {locationDetails ? (
          <>
            <Paragraph>job type: {jobType}</Paragraph>
            <Paragraph>location: {location}</Paragraph>
          </>
        ) : null}
        {size ? (
          <JobDescriptionDiv>
            {ReactHtmlParser(ReactHtmlParser(description)).slice(0, MAX_LENGTH)}
            ....
            <StyledLink to={`/job/${_id}`}>more </StyledLink>
          </JobDescriptionDiv>
        ) : (
          <JobDescriptionDiv>
            {ReactHtmlParser(ReactHtmlParser(description))}
          </JobDescriptionDiv>
        )}
        <JobItemBottom>
          <Paragraph>
            <span style={{ color: '#8E8C89' }}>
              {' '}
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </span>
          </Paragraph>
          {!auth.loading && user === auth.user._id && (
            <Button
              noHeight='true'
              noBorder='true'
              small='true'
              onClick={e => deleteJob(_id)}
            >
              <i className='fas fa-trash-alt'></i> delete this job
            </Button>
          )}
        </JobItemBottom>
      </JobItemRightContainer>
    </JobItemContainer>
  );
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
