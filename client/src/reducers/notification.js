import {
    GET_NOTIFICATIONS,
    NOTIFICATIONS_ERROR,
    CLEAR_NOTIFICATIONS
} from '../actions/types';

const initialState = {
    notification: null,
    notifications: {},
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                loading: false
            };
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notification: null,
                notifications: {},
                loading: false
            };
        case NOTIFICATIONS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}