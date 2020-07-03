import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import ImageUpload from '../fileuploader/ImageUpload';
import { getCurrentProfile } from '../../actions/profile';

const ModalWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  background: #1c1b1a;
  border: 1px solid #1c1b1a;
  /* box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17); */
  -webkit-box-shadow: 0px 0px 69px 7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 69px 7px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 69px 7px rgba(0, 0, 0, 0.75);
  transition: all 0.8s;
  width: 500px;
  max-width: 500px;
  ${props =>
    props.show
      ? css` 
                transform: translateY(0vh));
                opacity: 1;`
      : css`
          transform: translateY(-100vh);
          opacity: 0;
        `}
`;
const ModalBody = styled.div`
  padding: 10px 15px;
  text-align: center;
  background: rgb(7, 6, 6);
  background: linear-gradient(
    121deg,
    rgba(7, 6, 6, 1) 50%,
    rgba(42, 41, 39, 1) 50%
  );
`;

const Modal = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth: { user },
  show
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <>
      <ModalWrapper show={show}>
        <ModalBody>
          <ImageUpload profile={profile} />
        </ModalBody>
      </ModalWrapper>
    </>
  );
};

Modal.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Modal);
