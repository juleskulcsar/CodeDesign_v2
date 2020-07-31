import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import { deletePostComment } from '../../actions/post';
import { Paragraph, StyledLink } from '../common/Edit-Create-Profile';
import { Button } from '../common/Button';

const CommentItem = styled.div`
  padding: 0.1rem 0.2rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;
  align-items: center;
  border-bottom: 1px solid black;
`;
const RoundImage = styled.img`
  border-radius: 50%;
  border: 1px solid #f16350;
  object-fit: cover;
  width: 50px;
  height: 50px;
  padding: 2px;
  margin-right: 1em;
`;

const PostCommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, profile },
  auth,
  deletePostComment
}) => {
  return (
    <CommentItem>
      <div>
        <StyledLink to={`/profile/${user}`}>
          <RoundImage src={profile.profilePhoto} alt='' />
          <Paragraph>{profile.displayName}</Paragraph>
        </StyledLink>
      </div>
      <div>
        <Paragraph>{text}</Paragraph>
        <Paragraph>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          {'   '}
          {!auth.loading && user === auth.user._id && (
            <Button
              small={true}
              postPage={true}
              onClick={() => deletePostComment(postId, _id)}
            >
              <i className='fas fa-trash-alt' />
            </Button>
          )}
        </Paragraph>
      </div>
    </CommentItem>
  );
};

PostCommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePostComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePostComment })(PostCommentItem);
