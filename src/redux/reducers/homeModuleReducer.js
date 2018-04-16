import {HOME_MODULE} from '../actions/actionTypes';

const home_module = (state={"todayOpinion":0,"opinionTrend":0,"newestOpinion":0,"negativeOpinion":0,"newestWarningOpinion":0,"weiboOpinion":0,"topicOpinion":0,"opinionCount":0,"HotWord":0,"mediaDistribution":0}, action) => {
    switch (action.type) {
        case HOME_MODULE:
            return action.payload;
        default:
            return state;
    }
};

export default home_module;