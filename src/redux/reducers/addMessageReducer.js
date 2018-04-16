import {ADD_MESSAGE_REMOVE} from '../actions/actionTypes';

const addMessageReducer = (state='1', action) => {
    switch (action.type) {
        case ADD_MESSAGE_REMOVE:
            return action.payload;
        default:
            return state;
    }
};

export default addMessageReducer;