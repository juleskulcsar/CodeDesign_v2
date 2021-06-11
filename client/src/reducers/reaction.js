import { GET_LIKES, GET_SAVES } from '../actions/types';

const initialState = {
    likes: [],
    saves: [],
    loading: true,
    liked: false,
    saved: false,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_LIKES:
            return {
                ...state,
                likes: payload,
                loading: false
            };
        case GET_SAVES:
            return {
                ...state,
                saves: payload,
                loading: false
            };

        default:
            return state;
    }
}
