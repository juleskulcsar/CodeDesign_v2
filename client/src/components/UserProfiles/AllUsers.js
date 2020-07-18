import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { getProfiles } from '../../actions/profile';
import UserProfileItem from './UserProfileItem';
import { RoundImage, StyledLink, H4Styled } from '../common/Edit-Create-Profile'
import { StyledFiltersDiv, StyledFiltersList, StyledFiltersUl } from '../common/Filters'
import { SwitchLabel, Slider, CheckBoxInput } from '../common/CheckBox';
import {
    LeftContainer,
    RightContainer,
    Paragraph
} from '../common/Edit-Create-Profile';

const AllUsersContainer = styled.div`
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

const AllUsers = ({ getProfiles, profile: { profiles, profile, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    console.log('profiles: ', profile)

    return loading ? (
        <Spinner />
    ) : (
            <>
                <TitleWrapper>
                    <PageTitle>Browse the Code<span style={{ color: '#F16350' }}>D</span>esign <span style={{ color: '#F16350' }}>community</span>!</PageTitle>
                </TitleWrapper>
                <AllUsersContainer>
                    <LeftContainer>
                        <StyledFiltersUl>
                            <StyledFiltersList>
                                <Paragraph filters={true}>designers </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox" />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>developers </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox" />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                        </StyledFiltersUl>
                    </LeftContainer>
                    <RightContainer >
                        {profiles.data && profiles.data.map(profile => (
                            <UserProfileItem key={profile._id} profile={profile} />
                        ))}
                    </RightContainer>
                </AllUsersContainer>
            </>
        );
};

AllUsers.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(AllUsers);
