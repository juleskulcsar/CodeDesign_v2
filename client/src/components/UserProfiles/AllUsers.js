import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { getProfiles } from '../../actions/profile';
import UserProfileItem from './UserProfileItem';
import { StyledFiltersList, StyledFiltersUl } from '../common/Filters'
import { SwitchLabel, Slider, CheckBoxInput } from '../common/CheckBox';
import {
    LeftContainer,
    RightContainer,
    Paragraph
} from '../common/Edit-Create-Profile';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import {
    Form
} from '../common/SignIn-SignUp';

const AllUsersContainer = styled.div`
  position: relative;
  top: 5em;
  width: 75%;
  margin: 0 auto;
  color: white;
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

    // console.log('profiles: ', profiles)

    let filters = {}
    const [filterParams, setFilterparams] = useState(filters);
    const [designersCheck, setDesignersCheck] = useState(true);
    const [developersCheck, setDevelopersCheck] = useState(true);
    const [designersChecked, setDesignersChecked] = useState(false);
    const [developersChecked, setDevelopersChecked] = useState(false);
    const [skill, setSkill] = useState('')

    const onChange = e => {
        setSkill(e.target.value);
        console.log(e.target.value)
    }

    const onClick = () => {
        console.log('skill: ', skill)
        delete filters.skills;
        for (let i = 0; i < profiles.data.length; i++) {
            if (profiles.data[i].skills.indexOf(skill) !== -1) {
                filters.skills = profiles.data[i].skills[profiles.data[i].skills.indexOf(skill)]
            }
        }
        getProfiles(filters);
    }


    const designersClickHandler = () => {
        setDesignersCheck(!designersCheck)
        setDesignersChecked(!designersChecked)
        if (designersCheck === true) {
            setDevelopersCheck(true)
            setDevelopersChecked(false)
            for (let i = 0; i < profiles.data.length; i++) {
                if (profiles.data[i].skills.indexOf('javascript') !== -1) {
                    filters.skills = profiles.data[i].skills[profiles.data[i].skills.indexOf('javascript')]
                }
            }
            // filters.skills.javascript = 'javascript'
            setFilterparams(filters);
            getProfiles(filters);
        } else {
            delete filters.specialties;
            setFilterparams(filters);
            getProfiles(filters);
        }
    }

    const developersClickHandler = () => {
        setDevelopersCheck(!developersCheck)
        setDevelopersChecked(!developersChecked)
        if (developersCheck === true) {
            setDesignersCheck(true)
            setDesignersChecked(false)
            filters.specialties = 'Developer'
            setFilterparams(filters)
            getProfiles(filters);
        } else {
            delete filters.specialties;
            setFilterparams(filters)
            getProfiles(filters);
        }
    }


    return profiles.length === 0 ? (
        <Spinner />
    ) : (
            <Fragment>
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
                                        type="checkbox"
                                        checked={designersChecked}
                                        onChange={designersClickHandler} />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>developers </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                        checked={developersChecked}
                                        onChange={developersClickHandler} />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <div>
                                <Paragraph filters={true}>search by skill </Paragraph>
                                <Input
                                    type='text'
                                    placeholder='type skill'
                                    name='skill'
                                    value={skill}
                                    onChange={e => onChange(e)}
                                />
                                <Button onClick={onClick} >search </Button>
                            </div>
                        </StyledFiltersUl>
                    </LeftContainer>
                    <RightContainer >
                        {profiles.data && profiles.data.map(profile => (
                            <UserProfileItem key={profile._id} profile={profile} />
                        ))}
                    </RightContainer>
                </AllUsersContainer>
            </Fragment>
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
