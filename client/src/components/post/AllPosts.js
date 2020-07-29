import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Paragraph, H4Styled } from '../common/Edit-Create-Profile';

const PostsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1em;
  `;

const AllPosts = ({
    getPosts,
    post: { posts, loading },
    auth
}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    console.log('posts: ', posts)

    return posts.length === 0 ? (
        <Spinner />
    ) : (
            <Fragment>
                <H4Styled >
                    <i className='fas fa-images'></i> __browse CodeDesign community's posts
                </H4Styled>
                <PostsList>
                    {posts.data.map(post => (
                        <PostItem
                            key={post._id}
                            post={post}
                            size={true}
                            showAction={true}
                            showD={false}
                        />
                    ))}
                </PostsList>
            </Fragment>
        );
};

AllPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    posts: state.posts,
    profiles: state.profiles,
    auth: state.auth
});
export default connect(mapStateToProps, {
    getPosts
})(AllPosts);
