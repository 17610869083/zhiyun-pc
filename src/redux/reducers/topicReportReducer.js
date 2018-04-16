import {TOPIC_REPORT_EXPORT} from '../actions/actionTypes';

const topicReportReducer = (state='1', action) => {
    switch (action.type) {
        case TOPIC_REPORT_EXPORT:
            return action.payload;
        default:
            return state;
    }
};

export default topicReportReducer;