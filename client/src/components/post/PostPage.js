import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../layout/Spinner';
import Post from './Post';
import { getPostById } from '../../actions/post';
import { getPosts } from '../../actions/post';

const PostContainer = styled.div`
  position: relative;
  top: 4em;
  max-width: 80%;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  @media (max-width: 450px) {
    display: block;
    grid-template-columns: 1fr;
  }
`;

const MoreItemsWrapper = styled.div`
  text-align: center;
  position: relative;
  top: 2em;
  border-right: 1px solid #ad4d2a;
  padding-right: 1em;
  width: 200px;
`;

const MoreItems = styled.div`
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  padding: 5px;
  margin-bottom: 5px;
  max-width: 120px;
  display: inline-block;
  @media (max-width: 450px) {
    display: none;
  }
`;

const MoreItemsImage = styled.img`
  max-width: 110px;
  object-fit: cover;
`;

const P = styled.p`
  color: #bfbdbc;
  line-height: 1.6;
  margin-top: 0;
  @media (max-width: 450px) {
    display: none;
  }
`;

const PostWrapper = styled.div`
  margin: auto;
  padding: 0 4em;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
`;

const PostPage = ({
  getPostById,
  getPosts,
  post: { posts, post, loading },
  match,
  auth
}) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log('post: ', post);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <PostContainer>
        <MoreItemsWrapper>
          <P>more from {post.profile.displayName}: </P>
          <br />
          {posts
            .filter(p => p.user === post.user)
            .slice(0, 4)
            .map(postlist => (
              <MoreItems key={postlist._id}>
                <Link to={`/post/${postlist._id}`}>
                  <MoreItemsImage src={postlist.postImage}></MoreItemsImage>
                </Link>
                <P>{postlist.title}</P>
              </MoreItems>
            ))}
        </MoreItemsWrapper>
        <PostWrapper>
          <Post
            post={post}
            showActions={true}
            size={false}
            auth={auth}
            showD={true}
          />
        </PostWrapper>
      </PostContainer>
    </>
  );
};

PostPage.propTypes = {
  getPostById: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPostById,
  getPosts
})(PostPage);
