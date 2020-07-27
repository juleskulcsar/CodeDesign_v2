import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileGithub from '../profile/ProfileGithub';
import UserProfileActions from '../profile/UserProfileActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from '../profile-form/ProfileTop';
import {
    ProfileBottomDiv,
    Container,
    LeftContainer,
    RightContainer
} from '../common/Edit-Create-Profile';

const UserProfileGithub = ({
    profile: { profile, loading },
    getProfileById,
    auth,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);
    return profile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <Container>
                    <LeftContainer>
                        <UserProfileActions profile={profile} match={match} />
                    </LeftContainer>
                    <RightContainer>
                        <ProfileTopSection profile={profile} />
                        <ProfileBottomDiv>
                            {profile.githubusername ? (
                                <ProfileGithub username={profile.githubusername} />
                            ) :
                                <h2>{profile.displayName} doesn't have any github repos</h2>}
                        </ProfileBottomDiv>
                    </RightContainer>
                </Container>
            </Fragment>
        );
};

UserProfileGithub.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(UserProfileGithub);
