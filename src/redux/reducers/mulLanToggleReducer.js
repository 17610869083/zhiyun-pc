import {MUL_LANGUAGES_TOGGLE} from '../actions/actionTypes';

const addMessageReducer = (state=0, action) => {
    switch (action.type) {
        case MUL_LANGUAGES_TOGGLE:
                return action.payload
        default:
            return state;
    }
};

export default addMessageReducer;