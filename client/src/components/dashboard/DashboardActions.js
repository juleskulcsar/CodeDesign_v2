import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #f16350;
  text-decoration: none;
  line-height: 1.6;
`;

const StyledDiv = styled.div`
  /* display: flex;
  flex-direction: column;*/
`

const StyledUl = styled.ul`
    list-style: none;
    padding:0;
`

const StyledList = styled.li`
    padding: 5px;
    > a {
        position: relative;
        color: #8E8C89;
        text-decoration: none;
    }
    > a:hover {
        color: #AD4D2A;
    }
    > a:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #8E8C89;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }
    > a:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
`

const DashboardActions = () => {
  return (
    <StyledDiv>
      <StyledUl>
        <StyledList>
          <StyledLink to='/dashboard/edit-profile'>
            edit profile
      </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink to='/dashboard/myposts'>
            my posts
      </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink to='/dashboard/myjobs'>
            my jobs
      </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink to='/portfolio-upload'>
            create post
      </StyledLink>
        </StyledList>
      </StyledUl>
    </StyledDiv>
  );
};

export default DashboardActions;
