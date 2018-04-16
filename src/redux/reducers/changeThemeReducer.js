import {CHANGE_THEME} from '../actions/actionTypes';
import {getTheme} from '../../utils/localStorage';

const changeThemeReducer = (state = getTheme(), action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return action.payload;
        default:
            return state;
    }
};

export default changeThemeReducer;