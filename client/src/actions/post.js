import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_POST_LIKES,
    UPDATE_POST_UNLIKES,
    DELETE_POST,
    ADD_POST,
    CLEAR_POST,
    ADD_POST_COMMENT,
    REMOVE_POST_COMMENT,
    UPDATE_POST_SAVES,
    UPDATE_POST_UNSAVES,
    GET_PROFILES,
    GET_PROFILE,
    CLEAR_PROFILE,
    GET_NOTIFICATIONS,
    NOTIFICATIONS_ERROR
} from './types';
import { getCurrentProfile } from './profile';
import { getNotificationsByUser } from './notification';

//add post
export const addPost = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/post/post-upload', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('post added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get all posts
export const getPosts = filter => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/post', {
            params: filter
        });

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//get post
export const getPostById = postId => async dispatch => {
    // dispatch({ type: CLEAR_POST });
    try {
        const res = await axios.get(`/api/post/${postId}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//remove post
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert('post deleted', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//add like
export const addPostLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${id}`);

        dispatch({
            type: UPDATE_POST_LIKES,
            payload: { id, likes: res.data }
        });
        dispatch(getPostById(id));
        dispatch(getNotificationsByUser(res.data[0].user));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//remove like
export const removePostLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlike/${id}`);
        dispatch({
            type: UPDATE_POST_UNLIKES,
            payload: { id, likes: res.data }
        });
        dispatch(getPostById(id));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//add like
export const addPostSave = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/save/${id}`);
        dispatch({
            type: UPDATE_POST_SAVES,
            payload: { id, saves: res.data }
        });
        dispatch(getPostById(id));
        dispatch(getNotificationsByUser(res.data[0].user));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//remove like
export const removePostSave = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unsave/${id}`);
        dispatch({
            type: UPDATE_POST_UNSAVES,
            payload: { id, saves: res.data }
        });
        dispatch(getPostById(id));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// add comment
export const addPostComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `/api/post/comment/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_POST_COMMENT,
            payload: res.data
        });
        dispatch(getNotificationsByUser(res.data[0].user));

        dispatch(setAlert('comment added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// delete comment
export const deletePostComment = (postId, postCommentId) => async dispatch => {
    try {
        await axios.delete(`/api/post/comment/${postId}/${postCommentId}`);

        dispatch({
            type: REMOVE_POST_COMMENT,
            payload: postCommentId
        });

        dispatch(setAlert('comment removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
