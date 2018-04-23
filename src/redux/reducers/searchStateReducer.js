import {SEARCH_STATE} from '../actions/actionTypes';

const search_state = (state={data:true}, action) => {
    switch (action.type) {
        case SEARCH_STATE:
            return action.payload;
        default:
            return state;
    }
};

export default search_state;