import { combineReducers } from 'redux';
import {
  CHANGE_CURRENT_IMAGE, CHANGE_CURRENT_SUGGESTION, FAIL_SUGGESTIONS,
  REQUEST_SUGGESTIONS, TOGGLE_DESCRIPTION, UPDATE_SUGGESTIONS, CLOSE_MATCH, SHOW_MATCH,
} from './actions';

const baseConsultAPI = {
  suggestions: {},
  error: null,
  success: null,
  userIndex: 0,
};

function consultAPI(state = baseConsultAPI, action) {
  const {
    suggestions, error, type, userIndex,
  } = action;

  switch (type) {
    case CHANGE_CURRENT_SUGGESTION:
      return {
        ...state,
        userIndex,
      };
    case FAIL_SUGGESTIONS:
      return {
        suggestions: [],
        error,
        success: false,
        userIndex: 0,
      };
    case REQUEST_SUGGESTIONS:
      return {
        suggestions: [],
        error: null,
        success: null,
        userIndex: state.userIndex,
      };
    case UPDATE_SUGGESTIONS:
      return {
        suggestions,
        error: null,
        success: true,
        userIndex: 0,
      };
    default:
      return state;
  }
}

function match(state = {}, action) {
  const { type, user } = action;

  switch (type) {
    case CLOSE_MATCH:
      return {
        open: false,
        user: {},
      };
    case SHOW_MATCH:
      return {
        open: true,
        user,
      };
    default:
      return state;
  }
}

const baseProfileInteraction = {
  imageIndex: 0,
  showDescription: false,
};

function profileInteraction(state = baseProfileInteraction, action) {
  const { imageIndex, showDescription, type } = action;

  switch (type) {
    case CHANGE_CURRENT_IMAGE:
      return {
        ...state,
        imageIndex,
      };
    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription,
      };
    default:
      return state;
  }
}

export const relationship = combineReducers({ consultAPI, match, profileInteraction });

export default relationship;
