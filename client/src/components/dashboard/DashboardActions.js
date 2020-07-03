import React from 'react';
import { Link as RouterDomLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Link = ({ isActive, children, ...props }) => {
  return <RouterDomLink {...props}>{children}</RouterDomLink>;
};

const StyledLink = styled(Link)`
  color: ${props => (props.isActive ? 'red' : '#f16350')};
  text-decoration: none;
  line-height: 1.6;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`;

const StyledDiv = styled.div`
  /* border-left: 1px solid #55524e; */
  border-left: 1px solid #682e19;
  padding-left: 1em;
  margin-top: 1.5em;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledList = styled.li`
  padding: 5px;
  > a {
    position: relative;
    color: #8e8c89;
    text-decoration: none;
  }
  > a:hover {
    color: #ad4d2a;
  }
  > a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #8e8c89;
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
`;

const DashboardActions = () => {
  const { pathname } = useLocation();

  return (
    <StyledDiv>
      <StyledUl>
        <StyledList>
          <StyledLink isActive={pathname === '/dashboard'} to='/dashboard'>
            about
          </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink
            isActive={pathname === '/dashboard/edit-profile'}
            to='/dashboard/edit-profile'
          >
            edit profile
          </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink
            isActive={pathname === '/dashboard/settings'}
            to='/dashboard/settings'
          >
            settings
          </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink
            isActive={pathname === '/dashboard/myposts'}
            to='/dashboard/myposts'
          >
            my posts
          </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink
            isActive={pathname === '/dashboard/myjobs'}
            to='/dashboard/myjobs'
          >
            my jobs
          </StyledLink>
        </StyledList>
        <StyledList>
          <StyledLink
            isActive={pathname === '/portfolio-upload'}
            to='/portfolio-upload'
          >
            create post
          </StyledLink>
        </StyledList>
      </StyledUl>
    </StyledDiv>
  );
};

export default DashboardActions;
