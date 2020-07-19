import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import styled, { css } from 'styled-components';
import { RoundImage, StyledLink, Paragraph, H4Styled } from '../common/Edit-Create-Profile'


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr 2fr;
    align-items: top;
    grid-gap: 2rem;
    padding: 1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    border-bottom: 1px solid #55524e;
`
const ImageWrapper = styled.div`
    border-radius: 50%;
    object-fit: cover;
    width: 150px;
    height: 150px;
    padding-bottom: 1em;
`
const StyledSkillsUl = styled.ul`
    list-style: none;
    padding-left: 1em;
    margin-top: 1.5em;
    padding-right: 1.5em;
`;
const StyledSkillsList = styled.li`
    padding: 5px;
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    line-height: 1;
`;

const ViewProfile = styled(Link)`
    text-decoration: none;
    line-height: 1.6;
    padding: 2px;
`

const DetailsWrapper = styled.div`
    > a {
    position: relative;
    color: #F16350;
    text-decoration: none;
  }
  > a:hover {
    color: #8e8c89;
  }
  > a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ad4d2a;
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

const UserProfileItem = ({
    profile: {
        user: { _id, name },
        specialties,
        location,
        skills,
        profilePhoto,
        website,
        displayName,
        loading
    }
}) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Link to={`/user/${_id}`}>
                    <RoundImage profileItem='true' src={profilePhoto} alt='' />
                </Link>
            </ImageWrapper>
            <DetailsWrapper>
                <H4Styled>{displayName}</H4Styled>
                <Paragraph>
                    {specialties}
                </Paragraph>
                <Paragraph >{location && <span>{location}</span>}</Paragraph>
                <ViewProfile to={`/user/${_id}`} >
                    View Profile
                    </ViewProfile>
            </DetailsWrapper>
            <StyledSkillsUl>
                {skills.slice(0, 3).map((skill, index) => (
                    <StyledSkillsList key={index} >
                        <i className='fas fa-check' /> {skill}
                    </StyledSkillsList>
                ))}
            </StyledSkillsUl>
        </Wrapper>
    );
};

UserProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default UserProfileItem;
