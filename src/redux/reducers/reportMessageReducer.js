import {REPORT_MESSAGE} from '../actions/actionTypes';
const reportMessage = (state={}, action) => { 
    switch (action.type) {
        case REPORT_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};

export default reportMessage;