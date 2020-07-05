import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addPost } from '../../actions/post';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import FileTypeInput from '../common/FileTypeInput';

const PostUploadWrapper = styled.div`
  text-align: center;
`;

const ImageUploadPreview = styled.div`
  margin: 0 auto;
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  @media (max-width: 748px) {
    width: 100%;
  }
`;

const UploadButtonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`;

const InputDiv = styled.div`
  margin-bottom: 8px;
  color: gray;
  text-align: left;
`;

const StyledImg = styled.img`
  object-fit: cover;
  border: 1px solid #ad4d2a;
  padding: 2px;
  background-color: #bfbdbc;
  width: 90%;
`;

const ImageUploadTop = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  flex-wrap: wrap;
`;
const ImageUploadTopLeft = styled.div`
  padding: 0;
  border: 1px solid gray;
  margin-bottom: 8px;
`;
const ImageUploadTopRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
`;

const PostUpload = ({ addPost, history }) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const [formPostData, setPostData] = useState({
    title: '',
    description: '',
    technologies: '',
    postImage: '',
    loading: false
  });

  const { title, description, technologies, postImage } = formPostData;

  //create the preview
  useEffect(() => {
    if (!postImage) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(postImage);
  }, [postImage]);

  let pickedFile;
  const pickedHandler = event => {
    pickedFile = event.target.files[0];

    setPostData({ postImage: pickedFile });
  };

  const handleChange = e => {
    setPostData({ ...formPostData, [e.target.name]: e.target.value });
  };

  const upload = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', postImage);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('technologies', technologies);
    setPostData({ loading: true });
    addPost(formData, history);
  };

  const { loading } = formPostData;
  console.log('loading is: ', loading);

  function goBack() {
    window.history.go(0);
  }

  return (
    <PostUploadWrapper>
      <Button floatRight='true' small='true' noBorder='true' onClick={goBack}>
        X
      </Button>
      <ImageUploadTop>
        <ImageUploadTopLeft>
          <ImageUploadPreview>
            {previewUrl && <StyledImg src={previewUrl} alt='Preview' />}
            {!previewUrl && (
              <i className='fas fa-camera'>
                <p>Image must be smaller than 2Mb</p>
              </i>
            )}
          </ImageUploadPreview>
          <UploadButtonWrapper>
            <Button noBorder='true' small='true'>
              select file
            </Button>
            <FileTypeInput onChange={pickedHandler} />
          </UploadButtonWrapper>
        </ImageUploadTopLeft>
        <ImageUploadTopRight>
          <InputDiv>
            <small>
              <span style={{ color: '#8E8C89' }}>* = required fields</span>
            </small>
            <Input
              name='* title'
              onChange={e => handleChange(e)}
              placeholder='* project title'
            />
          </InputDiv>
          <InputDiv>
            <Input
              type='text'
              placeholder='* technologies (eg: html, css, javascript)'
              name='technologies'
              onChange={e => handleChange(e)}
            />
            {/* <small>use comma separated values</small> */}
          </InputDiv>
          <Textarea
            name='description'
            onChange={e => handleChange(e)}
            placeholder='* project description'
          />
        </ImageUploadTopRight>
      </ImageUploadTop>

      <Button
        disabled={loading}
        small='true'
        type='button'
        onClick={e => {
          upload(e);
        }}
      >
        {loading ? 'Submitting....' : 'Submit'}
      </Button>
    </PostUploadWrapper>
  );
};

PostUpload.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostUpload);
