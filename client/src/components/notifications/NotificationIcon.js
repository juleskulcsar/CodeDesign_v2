import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { loadUser } from '../../actions/auth';
import { getNotificationsByUser, resetCount } from '../../actions/notification';
import NotificationDropdown from './NotificationDropdown';

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

const NotificationItem = (
    { auth: { isAuthenticated },
        user,
        notification: { notification, notifications, loading },
        resetCount
    }
) => {
    console.log(user)
    useEffect(() => {
        loadUser();
    }, []);
    useEffect(() => {
        getNotificationsByUser(user._id);
    }, []);

    const [isVisible, setIsVisible] = useState(false)

    const clickHandler = () => {
        setIsVisible(!isVisible);
        resetCount(user._id);
    }

    return (
        <>
            <i
                onClick={e => clickHandler()}
                className="far fa-bell"
                style={{ fontSize: '20px', float: 'left', color: 'white', position: 'relative', right: '5px' }}>
            </i>
            {
                !notifications || !notifications.notifications ? null : (
                    notifications.notifications.countNew === 0 ? null : <NotifNo>{notifications.notifications.countNew}</NotifNo>
                )
            }
            {isVisible ? <NotificationDropdown notification={notification} /> : null}
        </>
    )
}

NotificationItem.propTypes = {
    auth: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    getNotificationsByUser: PropTypes.func.isRequired,
    resetCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    notification: state.notification
});

export default connect(mapStateToProps, { getNotificationsByUser, resetCount })(NotificationItem);