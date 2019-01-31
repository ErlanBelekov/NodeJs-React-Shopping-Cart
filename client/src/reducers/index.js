import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const modalInitialState = {
  modal_is_open:false
};

export const TOGGLE_MODAL = "TOGGLE_MODAL";

function modalReducer(state = modalInitialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modal_is_open:!state.modal_is_open
      };
    default:
      return state
  }
}

export default combineReducers({
    item:itemReducer,
    modal:modalReducer
});
