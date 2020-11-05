import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import styled, { css } from 'styled-components';
import { loadUser } from '../../actions/auth';
import { getNotificationsByUser } from '../../actions/notification';

const Wrapper = styled.div`
    background-color: #1C1B1A;
    float: right;
    padding: 0 0 0 0;
    position: absolute;
    top: 3.7em;
    width: 20em;
    overflow: scroll;
    height: fit-content;
    max-height: 90vh;
    border-radius: 1em 1em 1em 1em;
    border: 1px solid #9C4526;
`

const NotificationUl = styled.ul`
    padding:0 0 0 0;
    /* border: 1px solid #9C4526; */
    border-radius: 1em;
    > li a {
        padding: 10px 20px;
    }
`

const NotificationLi = styled.li`
    list-style: none;
`

const NotificationAnchor = styled(Link)`
    /* font-weight: bold; */
color: ${props => props.notification ? '#F16350' : '#EFEFEE'};
    text-decoration: none;
`
const AnchorWrapper = styled.div`
    width: 100%;
    background: #2A2927;
    padding: 13px 0 13px 0;
    border-radius: ${props => props.top ? "1em 1em 0 0" : "0 0 1em 1em"};
`

const Ul = styled.ul`
  padding-left: 0;
  position: relative;
  margin: 10px; 
  width: 210px;
  :after {
      content: "";
  height: auto;
  width: 1px;
  background: #e3e3e3;
  position: absolute;
  top: 5px;
  left: 30px;
  bottom: 25px;
  }
`

const Li = styled.li`
    position: relative;
    list-style: none;
  padding-left: 70px;
  margin-bottom: 20px;
  width: 100%;
  :after {
      content: "";
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: #e3e3e3;
  position: absolute;
  left: 1em;
    top: 0.2em;
  }
`

const Icon = styled.span`
    position: absolute;
  left: 23.5px;
  top: 7px;
  z-index: 12;
`

const Date = styled.span`
    display: inline-block;
  width: 100%;
  color: #a6a6a6;
  font-style: italic;
  font-size: 13px;
`
const P = styled.p`
    color: #D7D6D5;
`


const NotificationDropdown = (
    { auth: { isAuthenticated },
        user,
        notification: { notification, notifications, loading }
    }
) => {


    return (
        <Wrapper>
            <NotificationUl>
                <NotificationLi>
                    <AnchorWrapper top={true}>
                        <NotificationAnchor to={"#"}>Notifications</NotificationAnchor>
                    </AnchorWrapper>
                </NotificationLi>
                {!notifications.notifications ?
                    (<Ul >
                        <Li>
                            <P>
                                No new Notifications<NotificationAnchor href="">here</NotificationAnchor>
                                <Icon ><i class="far fa-thumbs-up" style={{ color: "#F16350" }}></i></Icon>
                                <Date>Dec 10, 22:00</Date>
                            </P>
                        </Li>
                    </Ul>) :
                    (
                        <Ul >
                            {notifications.notifications.notificationItems &&
                                notifications.notifications.notificationItems.map((notification) => (
                                    <Li key={notification._id}>
                                        {notification.notificationType === 'like' ?
                                            <P>
                                                <NotificationAnchor notification='true' to={`/user/${notification.profile.userId}`}>{notification.profile.name}</NotificationAnchor> liked your <NotificationAnchor notification='true' to={`/post/${notification.post.id}`}>{notification.post.title}</NotificationAnchor> {'    '}post
                                                <Icon ><i className="far fa-thumbs-up" style={{ color: "#F16350" }}></i></Icon>
                                                <Date><Moment format='YYYY/MM/DD'>{notification.date}</Moment></Date>
                                            </P>
                                            : (notification.notificationType === 'save' ? (
                                                <P>
                                                    <NotificationAnchor notification='true' to={`/user/${notification.profile.userId}`} style={{ color: "#2A7A6F" }}>{notification.profile.name}</NotificationAnchor> saved your <NotificationAnchor notification='true' to={`/post/${notification.post.id}`} style={{ color: "#2A7A6F" }}>{notification.post.title}</NotificationAnchor> {'    '}post
                                                    <Icon ><i className="far fa-bookmark" style={{ color: "#2A7A6F" }}></i></Icon>
                                                    <Date><Moment format='YYYY/MM/DD'>{notification.date}</Moment></Date>
                                                </P>
                                            ) : (notification.notificationType === 'comment' ?
                                                <P>
                                                    <NotificationAnchor notification='true' to={`/user/${notification.profile.userId}`}>{notification.profile.name}</NotificationAnchor> commented on your <NotificationAnchor notification='true' to={`/post/${notification.post.id}`}>{notification.post.title}</NotificationAnchor> {'    '}post
                                                    <Icon ><i className="far fa-comment-dots" style={{ color: "#A25F9A" }}></i></Icon>
                                                    <Date><Moment format='YYYY/MM/DD'>{notification.date}</Moment></Date>
                                                </P>
                                                : (notification.notificationType === 'welcome' ?
                                                    <P> Welcome to CodeDesign. Complete your profile
                                                    <Icon ><i className="far fa-comment-dots" style={{ color: "#A25F9A" }}></i></Icon>
                                                        <Date><Moment format='YYYY/MM/DD'>{notification.date}</Moment></Date>
                                                    </P> : null)))

                                        }
                                    </Li>
                                ))}
                        </Ul>
                    )
                }
                <NotificationLi>
                    <AnchorWrapper>
                        <NotificationAnchor to={"#"}>See all notifications</NotificationAnchor>
                    </AnchorWrapper>
                </NotificationLi>
            </NotificationUl>
        </Wrapper >
    )
}

NotificationDropdown.propTypes = {
    auth: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    getNotificationsByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    notification: state.notification
});

export default connect(mapStateToProps, { getNotificationsByUser })(NotificationDropdown);

