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
    return loading ? (
        <Spinner />
    ) : (
            <Wrapper>
                <ImageWrapper>
                    <RoundImage src={profilePhoto} alt='' />
                </ImageWrapper>
                <div>
                    <H4Styled>{displayName}</H4Styled>
                    <Paragraph>
                        {specialties}
                    </Paragraph>
                    <Paragraph >{location && <span>{location}</span>}</Paragraph>
                    <StyledLink to={`/user/${_id}`} >
                        View Profile
                </StyledLink>
                </div>
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