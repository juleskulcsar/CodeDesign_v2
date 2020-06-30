import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Button from '../button/Button';
import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
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
        getCurrentProfile()
    }, [getCurrentProfile])

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
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios
            .post('/api/profile/profilephoto', formData, config)
            .then(({ data }) => {
                console.log('data in upload: ', data)
                setImage(data.image);
            })
            .then(() => dispatch(setAlert('image uploaded', 'success')))
            .then(() => props.history.push('/dashboard'))
            .catch(err => {
                setIsValid(false);
                setLoading(false);
                console.log('error in axios.post /upload: ', err);
            });
    };

    return (
        <div className='form-control'>
            <input type='file' accept='.jpg,.png,.jpeg' onChange={pickedHandler} />
            <p>Select an image. Image must be smaller than 2Mb</p>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt='Preview' />}
                    {!previewUrl && <img src={props.profile.profilePhoto}></img>}
                </div>
                <Button
                    disabled={loading}
                    type='button'
                    onClick={e => {
                        upload(e);
                    }}
                >
                    {loading ? 'Submitting....' : 'Submit Image'}
                </Button>
            </div>
            <Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
      </Link>
            <br />
            {!isValid && (
                <p>
                    File too large or invalid format. <br /> Please select a valid file
        </p>
            )}
        </div>
    );
};

ImageUpload.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(ImageUpload);