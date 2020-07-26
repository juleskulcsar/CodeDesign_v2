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
    Paragraph,
    StyledSelect
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
    let filters = {}
    useEffect(() => {
        getProfiles(filters);
    }, [getProfiles]);

    const [designersCheck, setDesignersCheck] = useState(true);
    const [developersCheck, setDevelopersCheck] = useState(true);
    const [designersChecked, setDesignersChecked] = useState(false);
    const [developersChecked, setDevelopersChecked] = useState(false);
    // const [skill, setSkill] = useState('')
    // const [specialty, setSpecialty] = useState('')
    const [formData, setFormData] = useState({
        specialty: '',
        skill: ''
    });

    const {
        specialty,
        skill
    } = formData;

    // const onChange = e => {
    //     e.preventDefault()
    //     setSkill(e.target.value);
    //     setSpecialty(e.target.value)
    // }

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault()
        if (specialty !== '') {
            filters.specialties = specialty;
            getProfiles(filters);
        }
        if (skill !== '') {
            filters.skills = skill.toUpperCase();
            getProfiles(filters);
        }
        else {
            // delete filters.skills;
            // delete filters.specialties;
            getProfiles(filters)
        }
        console.log('filters: ', filters)
    }


    const designersClickHandler = (e) => {
        setDesignersCheck(!designersCheck)
        setDesignersChecked(!designersChecked)
        if (designersCheck === true) {
            setDevelopersCheck(true)
            setDevelopersChecked(false)
            filters.registeredAs = 'designer'
            onSubmit(e)
            getProfiles(filters);
        } else {
            delete filters.registeredAs;
            onSubmit(e)
            getProfiles(filters);
        }
    }

    const developersClickHandler = (e) => {
        setDevelopersCheck(!developersCheck)
        setDevelopersChecked(!developersChecked)
        if (developersCheck === true) {
            setDesignersCheck(true)
            setDesignersChecked(false)
            filters.registeredAs = 'developer'
            onSubmit(e)
            getProfiles(filters);
        } else {
            delete filters.registeredAs;
            onSubmit(e)
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
                    <LeftContainer filters={true}>
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
                                <Paragraph filters={true}>search by:</Paragraph>
                                <Form onSubmit={e => onSubmit(e)} filters={true}>
                                    {/* <Paragraph filters={true}><span style={{ color: '#F16350' }}>skill</span> </Paragraph> */}
                                    <Input
                                        type='text'
                                        placeholder='type skill'
                                        name='skill'
                                        value={skill}
                                        onChange={e => onChange(e)}
                                    />
                                    {/* <Paragraph filters={true}><span style={{ color: '#F16350' }}>specialty</span> </Paragraph> */}
                                    <StyledSelect
                                        name='specialty'
                                        value={specialty}
                                        onChange={e => onChange(e)}
                                    >
                                        <option value=''>specialty</option>
                                        <option value='FrontEnd Developer'>FrontEnd Developer</option>
                                        <option value='Backend Developer'>Backend Developer</option>
                                        <option value='FullStack Developer'>FullStack Developer</option>
                                        <option value='Software Engineer'>Software Engineer</option>
                                        <option value='Mobile Developer'>Mobile Developer</option>
                                        <option value='Graphics Developer'>Graphics Developer</option>
                                        <option value='Game Developer'>Game Developer</option>
                                        <option value='Data Scientist'>Data Scientist</option>
                                        <option value='Big Data Developer'>Big Data Developer</option>
                                        <option value='DevOps Developer'>DevOps Developer</option>
                                        <option value='Security Developer'>Security Developer</option>
                                        <option value='Graphic Designer'>Graphic Designer</option>
                                        <option value='UI/UX Designer'>UI/UX Designer</option>
                                        <option value='Mobile Designer'>Mobile Designer</option>
                                        <option value='Web Designer'>Web Designer</option>
                                        <option value='Product Designer'>Product Designer</option>
                                        <option value='Illustrator'>Illustrator</option>
                                        <option value='Brand Designer'>Brand Designer</option>
                                        <option value='Animation Designer'>Animation Designer</option>
                                        <option value='Motion Graphics Designer'>Motion Graphics Designer</option>
                                    </StyledSelect>
                                    <Button type='submit' value='search'>search</Button>
                                </Form>
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
