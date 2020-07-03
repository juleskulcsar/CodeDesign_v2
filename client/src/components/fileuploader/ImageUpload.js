import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getProfileById, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import { Button } from '../common/Button';
import { Paragraph } from '../common/SignIn-SignUp';
import FileTypeInput from '../common/FileTypeInput';

const ImageUploadPreview = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  border: 2px solid #f16350;
  border-radius: 50%;
  padding: 2px;
  width: 13rem;
  height: 13rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledImg = styled.img`
  width: 13rem;
  height: 13rem;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ccc;
`;
const ImageUploadDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const UploadButtonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`;

const UploadButton = styled.button`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  cursor: pointer;
  color: gray;
  :focus {
    outline: none !important;
  }
  :hover {
    color: #ad4d2a;
  }
`;

function goBack() {
  window.history.go(0);
}

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //create the preview
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let pickedFile;
  const pickedHandler = event => {
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const upload = e => {
    e.preventDefault();
    setFile(pickedFile);
    let formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    axios
      .post('/api/profile/profilephoto', formData)
      .then(({ data }) => {
        setProfilePhoto(data.profilePhoto);
      })
      .then(() => dispatch(setAlert('image uploaded', 'success')))
      .then(() => props.history.go(0))
      .catch(err => {
        setIsValid(false);
        setLoading(false);
        console.log('error in axios.post /profilephoto: ', err);
      });
  };

  return (
    <>
      <UploadButtonWrapper>
        <UploadButton>select file</UploadButton>
        <FileTypeInput onChange={pickedHandler} />
      </UploadButtonWrapper>
      <Paragraph upload='true'>Image must be smaller than 2Mb</Paragraph>
      <ImageUploadDiv>
        <ImageUploadPreview>
          {previewUrl && <StyledImg src={previewUrl} alt='Preview' />}
          {!previewUrl && (
            <StyledImg
              src={props.profile.profile.profilePhoto}
              alt='codeDesign'
            ></StyledImg>
          )}
        </ImageUploadPreview>
        <Button
          disabled={loading}
          onClick={e => {
            upload(e);
          }}
        >
          {loading ? 'Submitting....' : 'Submit Image'}
        </Button>
      </ImageUploadDiv>
      <Button onClick={goBack}>Close</Button>
      {!isValid && <Paragraph>File too large or invalid format</Paragraph>}
    </>
  );
};

ImageUpload.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(
  withRouter(ImageUpload)
);
