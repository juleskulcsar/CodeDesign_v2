import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getProfileById } from '../../actions/profile';
import UserProfileActions from '../profile/UserProfileActions';
import Spinner from '../layout/Spinner';
import ProfileTopSection from '../profile-form/ProfileTop';
import {
    ProfileBottomDiv,
    Container,
    LeftContainer,
    RightContainer
} from '../common/Edit-Create-Profile';
import Post from '../post/Post';

const UserProfilePosts = ({
    profile: { profile },
    getProfileById,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

    const PostsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1em;
  `;

    return profile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <Container>
                    <LeftContainer>
                        <UserProfileActions profile={profile} match={match} />
                    </LeftContainer>
                    <RightContainer>
                        <ProfileTopSection />
                        <ProfileBottomDiv>
                            {profile.posts.length > 0 ? (
                                <PostsList>
                                    {profile.posts.map(post => (
                                        <Post
                                            key={post._id}
                                            post={post}
                                            size={true}
                                            showActions={true}
                                            showD={false}
                                        />
                                    ))}
                                </PostsList>
                            ) : (
                                    <h2>{profile.displayName} doesn't have any posts yet</h2>
                                )}
                        </ProfileBottomDiv>
                    </RightContainer>
                </Container>
            </Fragment>
        );
};

UserProfilePosts.propTypes = {
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
})(UserProfilePosts);
