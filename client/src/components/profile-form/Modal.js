import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import ImageUpload from '../fileuploader/ImageUpload';
import { getCurrentProfile } from '../../actions/profile';
import { Button } from '../common/Button'
import './Modal.css';

const ModalWrapper = styled.div`
        position: relative;
        margin: 0 auto;
        background: #1C1B1A;
        border: 1px solid #d0cccc;
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
        transition: all .8s;
        width: 500px;
        max-width: 500px;
        ${props => props.show ?
        css` 
                transform: translateY(0vh));
                opacity: 1;`
        :
        css`
                transform: translateY(-100vh);
                opacity: 0;
            `}
    `
const ModalBody = styled.div`
        padding: 10px 15px;
        text-align: center;
    `
const ModalFooter = styled.div`
        background: #263238;
        height: 35px;
        padding: 15px;
    `

const Modal = ({
    getCurrentProfile,
    profile: { profile, loading },
    auth: { user },
    show,
    close
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
                {/* <ModalFooter>
                    <Button onClick={close}>CLOSE</Button>
                </ModalFooter> */}
            </ModalWrapper>
        </>
    )
}

Modal.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(
    Modal
);