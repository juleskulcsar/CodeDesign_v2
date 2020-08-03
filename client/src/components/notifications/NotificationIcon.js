import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { loadUser } from '../../actions/auth';
import { getProfileById } from '../../actions/profile';

const NotifNo = styled.span`
    padding: 3px 5px 2px;
    position: relative;
    bottom: 10px;
    right: 5px;
    display: inline-block;
    min-width: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    line-height: 1;
    vertical-align: baseline;
    white-space: nowrap;
    text-align: center;
    border-radius: 10px;
    background-color: #db5565;
`

const NotificationItem = ({ auth: { isAuthenticated, loading, user }, getProfileById, profile: { profile } }) => {

    useEffect(() => {
        loadUser();
    }, []);
    useEffect(() => {
        getProfileById(user);
    }, []);

    console.log('user in NotificationItem: ', user)
    console.log('profile in NotificationItem: ', profile)

    return (
        <>
            <i className="far fa-bell" style={{ fontSize: '20px', float: 'left', color: 'white', position: 'relative', right: '5px' }}></i>
            {profile === null ? null :
                <NotifNo>{profile.notifications.new.length}</NotifNo>
            }
        </>
    )
}

NotificationItem.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(NotificationItem);