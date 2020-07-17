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
import {
  getCurrentProfile,
} from '../../actions/profile';
import { Button } from '../common/Button';
import { Paragraph, StyledLink, H4Styled } from '../common/Edit-Create-Profile';

const Link = ({ isActive, children, ...props }) => {
  return <RouterDomLink {...props}>{children}</RouterDomLink>;
};

const JobItemContainer = styled.div`
  border-bottom: 1px solid #55524e;
`;

const JobItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

const JobDescriptionDiv = styled.div`
  color: #bfbdbc;
  line-height: 1.6;
`;

const MyJobItem = ({
  deleteJob,
  auth,
  job: { _id, title, description, jobType, location, name, user, date },
  showAction,
  size,
  getCurrentProfile,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  const MAX_LENGTH = 150;
  return loading ? (
    <Spinner />
  ) : (
      <JobItemContainer>
        <H4Styled>{title}</H4Styled>
        {size ? (
          <JobDescriptionDiv>
            {ReactHtmlParser(ReactHtmlParser(description)).slice(0, MAX_LENGTH)}
            ....
          <StyledLink to={`/job/${_id}`}>more </StyledLink>
          </JobDescriptionDiv>
        ) : (
            <>
              <JobDescriptionDiv>
                {ReactHtmlParser(ReactHtmlParser(description))}
              </JobDescriptionDiv>
            </>
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
              onClick={e => { deleteJob(_id); getCurrentProfile(); }}
            >
              <i className='fas fa-trash-alt'></i> delete this job
        </Button>
          )}
        </JobItemBottom>
      </JobItemContainer>
    );
};

MyJobItem.defaultProps = {
  showAction: true
};

MyJobItem.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  deleteJob,
  getCurrentProfile
})(MyJobItem);
