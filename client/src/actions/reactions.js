import axios from 'axios';
import { GET_LIKES, LIKES_ERROR, GET_SAVES, SAVES_ERROR } from './types';

//get likes by postID
export const getLikesById = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/likes/${postId}`);
        dispatch({
            type: GET_LIKES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LIKES_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//get saves by postID
export const getSavesById = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/saves/${postId}`);
        dispatch({
            type: GET_SAVES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SAVES_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
