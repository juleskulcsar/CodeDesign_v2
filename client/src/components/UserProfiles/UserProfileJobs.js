import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import UserProfileActions from '../profile/UserProfileActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from '../profile-form/ProfileTop';
import MyJobItem from '../job/MyJobItem';
import {
    ProfileBottomDiv,
    Container,
    LeftContainer,
    RightContainer
} from '../common/Edit-Create-Profile';

const UserProfileJobs = ({
    profile: { profile },
    getProfileById,
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
                            {profile.jobs.length ? (

                                profile.jobs.map(job => (
                                    <MyJobItem
                                        key={job._id}
                                        job={job}
                                        size={true}
                                        showActions={true}
                                        showD={false}
                                    />
                                ))
                            ) : (
                                    <h2>{profile.displayName} doesn't have jobs created</h2>
                                )
                            }
                        </ProfileBottomDiv>
                    </RightContainer>
                </Container>
            </Fragment>
        );
};

UserProfileJobs.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
export default connect(mapStateToProps, {
    getProfileById
})(UserProfileJobs);
