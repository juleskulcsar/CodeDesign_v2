import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  addPostLike,
  removePostLike,
  addPostSave,
  removePostSave,
  deletePost,
  getPostById
} from '../../actions/post';
import PostCommentForm from '../comment/PostCommentForm';
import PostCommentItem from '../comment/PostCommentItem';
import { Button } from '../common/Button';
import { getProfileById } from '../../actions/profile';
import { Paragraph } from '../common/Edit-Create-Profile';

const PostImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 5px;
  border: 10px solid #ebe9e9;
`;

const PostImageWrapper = styled.div`
  max-width: 1000px;
`;

const PostWrapper = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostTop = styled.div`
  bottom: 15px;
  left: 5px;
  color: #333333;
  width: 100%;
  transition: 0.5s ease;
  color: #333333;
  font-size: 0.8em;
  padding: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
`;

const PostDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2em;
`;

const ActionsDiv = styled.div`
  display: flex;
  width: 10em;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;
const StyledList = styled.li`
  padding: 5px;
  margin-bottom: 1em;
  line-height: 1;
  color: #bfbdbc;
`;

const Description = styled.p`
  color: #bfbdbc;
  line-height: 1.6;
  margin-top: 0;
  padding-top: 2em;
  padding-bottom: 2em;
`;

const RoundImage = styled.img`
  border-radius: 50%;
  border: 1px solid #f16350;
  object-fit: cover;
  width: 75px;
  height: 75px;
  padding: 2px;
  margin-right: 1em;
`;

const PostTitle = styled.h1`
  color: #efefee;
  margin: 0;
`;

const PostTopLeft = styled.div`
  display: flex;
`;

const P = styled.p`
  color: #bfbdbc;
  padding: 0;
`;

const CommentSection = styled.div`
  position: relative;
  width: 100%;
`;

const Heading = styled.h3`
  color: #efefee;
  margin: 0;
`;

const Post = ({
  addPostLike,
  removePostLike,
  addPostSave,
  removePostSave,
  deletePost,
  auth,
  post: {
    _id,
    title,
    description,
    technologies,
    user,
    likes,
    saves,
    comments,
    date,
    postImage,
    profile
  },
  showActions,
  profile: { profiles, loading },
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(user);
  }, [getProfileById, user]);
  useEffect(() => {
    getPostById(_id);
  });

  const saving = saves.filter(save => save.user === auth.user._id);
  const liking = likes.filter(like => like.user === auth.user._id);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <div>
              <RoundImage src={profile.profilePhoto} />
            </div>
            <div>
              <PostTitle>{title}</PostTitle>
              <P>by {profile.displayName}</P>
              <P>
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
              </P>
            </div>
          </PostTopLeft>
          <ActionsDiv>
            {showActions && (
              <Fragment>
                {liking.length > 0 ? (
                  <Button bttnLight={true} onClick={e => removePostLike(_id)}>
                    <i className='fas fa-thumbs-up'></i>{' '}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </Button>
                ) : (
                  <Button bttnLight={true} onClick={e => addPostLike(_id)}>
                    <i className='far fa-thumbs-up'></i>
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </Button>
                )}
                {saving.length > 0 ? (
                  <Button bttnLight={true} onClick={e => removePostSave(_id)}>
                    <i className='fas fa-bookmark'></i>{' '}
                    <span>
                      {saves.length > 0 && <span>{saves.length}</span>}
                    </span>
                  </Button>
                ) : (
                  <Button bttnLight={true} onClick={e => addPostSave(_id)}>
                    <i className='far fa-bookmark'></i>{' '}
                    <span>
                      {saves.length > 0 && <span>{saves.length}</span>}
                    </span>
                  </Button>
                )}
              </Fragment>
            )}
          </ActionsDiv>
        </PostTop>
        <PostImageWrapper>
          <PostImage src={postImage} />
        </PostImageWrapper>
        <PostDescription>
          {!auth.loading && user === auth.user._id && (
            <Button postPage={true} small={true} onClick={e => deletePost(_id)}>
              <i className='fas fa-times'></i> {'   '}delete post
            </Button>
          )}
          <Heading>description </Heading>
          <Description>{description}</Description>
          <Heading>done with: </Heading>
          {technologies.length > 0 && (
            <StyledUl>
              {technologies.map((technology, index) => (
                <StyledList key={index}>
                  <span style={{ color: '#AD4D2A' }}>
                    <i className='fas fa-check' />
                  </span>{' '}
                  {technology}
                </StyledList>
              ))}
            </StyledUl>
          )}
        </PostDescription>
        <CommentSection>
          <PostCommentForm postId={_id} />
          <br />
          <Paragraph className='comments-count'>
            {comments.length > 0 && <span>{comments.length}</span>} Comments
          </Paragraph>

          {comments.map(comment => (
            <PostCommentItem key={comment._id} comment={comment} postId={_id} />
          ))}
        </CommentSection>
      </PostWrapper>
    </>
  );
};

Post.defaultProps = {
  showActions: true
};

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  addPostLike: PropTypes.func.isRequired,
  removePostLike: PropTypes.func.isRequired,
  addPostSave: PropTypes.func.isRequired,
  removePostSave: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  addPostLike,
  removePostLike,
  addPostSave,
  removePostSave,
  deletePost,
  getProfileById
})(Post);
