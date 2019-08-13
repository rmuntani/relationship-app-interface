/* Action types */

export const FAIL_SUGGESTIONS = 'FAIL_SUGGESTIONS';
export const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS';
export const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS';
export const CHANGE_CURRENT_SUGGESTION = 'CHANGE_CURRENT_SUGGESTION';

export const CLOSE_MATCH = 'CLOSE_MATCH';
export const SHOW_MATCH = 'SHOW_MATCH';

export const CHANGE_CURRENT_IMAGE = 'CHANGE_CURRENT_IMAGE';
export const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION';

/* Action creator */

/* Users API */
export function failSuggestions(error) {
  return {
    error,
    type: FAIL_SUGGESTIONS,
  };
}

export function requestSuggestions() {
  return {
    type: REQUEST_SUGGESTIONS,
  };
}

export function updateSuggestions(suggestions) {
  return {
    suggestions,
    type: UPDATE_SUGGESTIONS,
  };
}

export function changeCurrentSuggestion(currIndex, numberOfUsers) {
  const newIndex = (numberOfUsers > 0) ? (currIndex + 1) % numberOfUsers : 0;
  return {
    userIndex: newIndex,
    type: CHANGE_CURRENT_SUGGESTION,
  };
}

/* Match screen */
export function closeMatch() {
  return {
    type: CLOSE_MATCH,
  };
}

export function showMatch(user) {
  return {
    user,
    type: SHOW_MATCH,
  };
}

/* Profile interaction */
export function changeCurrentImage(currIndex, numberOfImages) {
  const newIndex = (numberOfImages > 0) ? (currIndex + 1) % numberOfImages : 0;
  return {
    imageIndex: newIndex,
    type: CHANGE_CURRENT_IMAGE,
  };
}

export function toggleDescription(showDescription) {
  return {
    showDescription,
    type: TOGGLE_DESCRIPTION,
  };
}
