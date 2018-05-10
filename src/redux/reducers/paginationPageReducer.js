import {PAGINATION_PAGE} from '../actions/actionTypes';

const paginationPageReducer = (state = 1, action) => {
  switch (action.type) {
    case PAGINATION_PAGE:
      return action.payload;
    default:
      return state;
  }
};

export default paginationPageReducer;