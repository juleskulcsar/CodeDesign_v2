import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addPostComment } from '../../actions/post';
import { Button } from '../common/Button';

const CommentForm = styled.form`
  display: block;
  margin-top: 0.3rem;
  outline: none;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  outline: none;
  color: white;
  border-radius: 6px;
  resize: none;
`;
const Heading = styled.h3`
  color: #efefee;
  margin: 0;
  padding-top: 2em;
`;

const PostCommentForm = ({ postId, addPostComment }) => {
  const [text, setText] = useState('');

  return (
    <>
      <div>
        <Heading>
          <span style={{ color: '#AD4D2A' }}>
            <i className='far fa-comments'></i>
          </span>{' '}
          say something
        </Heading>
      </div>
      <CommentForm
        onSubmit={e => {
          e.preventDefault();
          addPostComment(postId, { text });
          setText('');
        }}
      >
        <CommentTextarea
          name='text'
          cols='30'
          rows='5'
          placeholder='...write here'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <Button small={true} postPage={true} floatRight={true} type='submit'>
          <i className='fas fa-paper-plane'></i> send
        </Button>
      </CommentForm>
    </>
  );
};

PostCommentForm.propTypes = {
  addPostComment: PropTypes.func.isRequired
};

export default connect(null, { addPostComment })(PostCommentForm);
