import React, { useState } from 'react';
import { Link as RouterDomLink } from 'react-router-dom';
import styled from 'styled-components';


const Link = ({ isActive, children, ...props }) => {
    return <RouterDomLink {...props}>{children}</RouterDomLink>;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  line-height: 1.6;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`;

const StyledDiv = styled.div`
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
    color: #bdbab7;
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

const UserProfileActions = ({
    profile: { profile, loading },
    auth,
    match
}) => {

    return (
        <>
            <StyledDiv>
                <StyledUl>
                    <StyledList>
                        <StyledLink to={`/user/${match.params.id}`}>
                            about
                    </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to={`/user/${match.params.id}/github`}>
                            github repos
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to={`/user/${match.params.id}/posts`}>
                            posts
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to={`/user/${match.params.id}/jobs`}>
                            jobs
                    </StyledLink>
                    </StyledList>
                </StyledUl>
            </StyledDiv>
        </>
    );
};

export default UserProfileActions;
