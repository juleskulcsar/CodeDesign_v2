import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addPostLike,
  removePostLike,
  addPostSave,
  removePostSave,
  deletePost
} from '../../actions/post';
import { Button } from '../common/Button';
import { Paragraph } from '../common/Edit-Create-Profile';

const Container = styled.div`
  position: relative;
  padding: 2px;
  margin-bottom: 1em;
`;

const PostOverlay = styled.div`
  position: absolute;
  bottom: 11px;
  left: 5px;
  background: rgba(56, 55, 52, 0.87);
  color: #333333;
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  display: flex;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  justify-content: space-between;
  box-shadow: inset 0 0 100px #1c1b1a;
  ${Container}:hover & {
    opacity: 1;
  }
`;

const PostImage = styled.img`
  height: 270px;
  width: 100%;
  object-fit: cover;
  margin: 5px;
  border: 1px solid rgba(56, 55, 52, 0.87);
  border-radius: 6px;
`;

const ActionsDiv = styled.div`
  width: 10em;
  display: flex;
  align-items: center;
  padding: 10px 10px 0 10px;
`;

const DetailsDiv = styled.div`
  padding: 0 10px 0 10px;
`;

const PostItem = ({
  addPostLike,
  removePostLike,
  addPostSave,
  removePostSave,
  deletePost,
  auth,
  post: { _id, title, likes, saves, date, postImage, user },
  showActions,
  profile: { profile, loading }
}) => {
  const saving = saves.filter(save => save.user === auth.user._id);
  const liking = likes.filter(like => like.user === auth.user._id);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Container>
      <Link to={`/post/${_id}`}>
        <PostImage src={postImage} />
      </Link>

      <PostOverlay>
        <DetailsDiv>
          <Paragraph>"{title}"</Paragraph>
          <Paragraph>
            Posted: <Moment format='YYYY/MM/DD'>{date}</Moment>
          </Paragraph>
        </DetailsDiv>
        <ActionsDiv>
          {liking.length > 0 ? (
            <Button
              onClick={e => removePostLike(_id)}
              type='button'
              bttnLight='true'
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
          ) : (
            <Button
              onClick={e => addPostLike(_id)}
              type='button'
              bttnLight='true'
            >
              <i className='far fa-thumbs-up'></i>
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </Button>
          )}
          {saving.length > 0 ? (
            <Button
              onClick={e => removePostSave(_id)}
              type='button'
              bttnLight='true'
            >
              <i className='fas fa-bookmark'></i>{' '}
              <span>{saves.length > 0 && <span>{saves.length}</span>}</span>
            </Button>
          ) : (
            <Button
              onClick={e => addPostSave(_id)}
              type='button'
              bttnLight='true'
            >
              <i className='far fa-bookmark'></i>
              <span>{saves.length > 0 && <span>{saves.length}</span>}</span>
            </Button>
          )}
        </ActionsDiv>
      </PostOverlay>
    </Container>
  );
};

PostItem.defaultProps = {
  showAction: true
};

PostItem.propTypes = {
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
  deletePost
})(PostItem);
