import {ON_SEARCH_CONTENT} from '../actions/actionTypes';

const onSearchContentReducer = (state = {keyword: "空"}, action) => {
    switch (action.type) {
        case ON_SEARCH_CONTENT:
            return action.payload;
        default:
            return state;
    }
};

export default onSearchContentReducer;