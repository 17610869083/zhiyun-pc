import {EXPORT_SKIP} from '../actions/actionTypes';

const exportSkip = (state='1', action) => {
    switch (action.type) {
        case EXPORT_SKIP:
            return action.payload;
        default:
            return state;
    }
};

export default exportSkip;