import {SET_LOCATION_PATHNAME} from '../actions/actionTypes';

const getRouterReducer = (state={}, action) => {
    switch (action.type) {
        case SET_LOCATION_PATHNAME:
            return action.payload;
        default:
            return state;
    }
};

export default getRouterReducer;