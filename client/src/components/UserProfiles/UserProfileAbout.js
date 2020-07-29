import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileTopSection from '../profile-form/ProfileTop';
import { getProfileById, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import UserProfileActions from '../profile/UserProfileActions';
import {
    ProfileBottomDiv,
    Container,
    LeftContainer,
    RightContainer,
    Paragraph,
    H4Styled
} from '../common/Edit-Create-Profile';

const UserProfileAbout = ({
    getProfileById,
    auth,
    match,
    profile: { profile }
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);


    console.log('profile: ', profile)

    return profile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <Fragment>
                    <Container>
                        <LeftContainer>
                            <UserProfileActions profile={profile} match={match} />
                        </LeftContainer>
                        <RightContainer>
                            <ProfileTopSection profile={profile} />
                            <ProfileBottomDiv>
                                {profile.bio && (
                                    <div>
                                        <H4Styled about='true'>About:</H4Styled>
                                        <Paragraph>{profile.bio}</Paragraph>
                                    </div>
                                )}
                                {profile.skills && (
                                    <div>
                                        {profile.skills.map((skill, index) => (
                                            <Paragraph key={index}>
                                                <i className='fas fa-check' /> {skill}
                                            </Paragraph>
                                        ))}
                                    </div>
                                )}
                            </ProfileBottomDiv>
                        </RightContainer>
                    </Container>
                </Fragment>
            </Fragment>
        );
};

UserProfileAbout.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(
    UserProfileAbout
);
