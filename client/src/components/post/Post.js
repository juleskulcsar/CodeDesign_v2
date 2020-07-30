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
  max-width: 100%;
`;

const PostWrapper = styled.div`
  align-items: center;
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
`;

const ActionsDiv = styled.div`
  display: flex;
  width: 10em;
`;

const StyledUl = styled.ul`
  list-style: none;
  margin-top: 1.5em;
  padding-right: 1.5em;
`;
const StyledList = styled.li`
  padding: 5px;
  margin-bottom: 1em;
  line-height: 1;
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
  width: 70px;
  height: 70px;
  padding: 2px;
  margin-right: 1em;
`;

const PostTitle = styled.h1`
  color: #efefee;
  line-height: 1.6;
`;

const PostTopLeft = styled.div`
  display: flex;
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
              <Paragraph>by {profile.displayName}</Paragraph>
              <Paragraph>
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
              </Paragraph>
            </div>
          </PostTopLeft>
          <ActionsDiv>
            {showActions && (
              <Fragment>
                {liking.length > 0 ? (
                  <Button onClick={e => removePostLike(_id)}>
                    <i className='fas fa-thumbs-up'></i>{' '}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </Button>
                ) : (
                  <Button onClick={e => addPostLike(_id)}>
                    <i className='far fa-thumbs-up'></i>
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </Button>
                )}
                {saving.length > 0 ? (
                  <Button onClick={e => removePostSave(_id)}>
                    <i className='fas fa-star'></i>{' '}
                    <span>
                      {saves.length > 0 && <span>{saves.length}</span>}
                    </span>
                  </Button>
                ) : (
                  <Button onClick={e => addPostSave(_id)}>
                    <i className='far fa-star'></i>
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
          <Description>{description}</Description>
          <h3>__done with: </h3>
          {technologies.length > 0 && (
            <StyledUl>
              {technologies.map((technology, index) => (
                <StyledList key={index}>
                  <i className='fas fa-check' /> {technology}
                </StyledList>
              ))}
            </StyledUl>
          )}
        </PostDescription>
        {!auth.loading && user === auth.user._id && (
          <Button onClick={e => deletePost(_id)}>
            <i className='fas fa-times'></i> delete your post
          </Button>
        )}
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
