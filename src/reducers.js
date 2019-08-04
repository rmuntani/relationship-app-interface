import { combineReducers } from 'redux';
import { CHANGE_CURRENT_IMAGE, TOGGLE_DESCRIPTION } from './actions';

const baseProfileInteraction = {
  imageIndex: 0,
  showDescription: false,
};

function profileInteraction(state = baseProfileInteraction, action) {
  const { imageIndex, type } = action;
  const { showDescription } = state;

  switch (type) {
    case CHANGE_CURRENT_IMAGE:
      return {
        ...state,
        imageIndex,
      };
    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription: !showDescription,
      };
    default:
      return state;
  }
}

export const relationship = combineReducers({ profileInteraction });

export default relationship;
