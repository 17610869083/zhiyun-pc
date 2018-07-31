import {MUL_LANGUAGES_TOGGLE} from '../actions/actionTypes';

const addMessageReducer = (state=0, action) => {
    switch (action.type) {
        case MUL_LANGUAGES_TOGGLE:
        console.log('reducer执行了')
            if(state === 0){
                return action.payload
            } else {
                return 0
            }
        default:
            return state;
    }
};

export default addMessageReducer;