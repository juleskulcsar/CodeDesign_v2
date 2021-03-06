import axios from 'axios';

import {
    GET_NOTIFICATIONS,
    NOTIFICATIONS_ERROR
} from './types';

// Get notifications by user ID
//we are using userId because we are  getting the notifications by signed in user id
export const getNotificationsByUser = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/notification/${userId}`);

        dispatch({
            type: GET_NOTIFICATIONS,
            payload: res.data
        });
    } catch (err) {
        console.log('err in get profile by id action: ', err);
        dispatch({
            type: NOTIFICATIONS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Update notifications from new to old
//we are using userId because we are  getting the notifications by signed in user id
export const resetCount = userId => async dispatch => {
    try {
        const res = await axios.put(`/api/notification/${userId}`);

        console.log('res.data in notification action: ', res.data)

        dispatch({
            type: GET_NOTIFICATIONS,
            payload: res.data
        });
    } catch (err) {
        console.log('err in update notifications by id action: ', err);
        dispatch({
            type: NOTIFICATIONS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};