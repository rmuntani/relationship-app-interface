/* Action types */

/* Users actions */
export const FAIL_SUGGESTIONS = 'FAIL_SUGGESTIONS';
export const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS';
export const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS';
export const CHANGE_CURRENT_SUGGESTION = 'CHANGE_CURRENT_SUGGESTION';

/* Match pop-up actions */
export const CLOSE_MATCH = 'CLOSE_MATCH';
export const SHOW_MATCH = 'SHOW_MATCH';

/* Profile description interaction */
export const CHANGE_CURRENT_IMAGE = 'CHANGE_CURRENT_IMAGE';
export const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION';

/* Chat with user screen */
export const FAIL_MATCHED_USERS_REQUEST = 'FAIL_MATCHED_USERS_REQUEST';
export const CHAT_WITH_USER = 'CHAT_WITH_USER';
export const REQUEST_MATCHED_USERS = 'REQUEST_MATCHED_USERS';
export const UPDATE_MATCHED_USERS = 'UPDATE_MATCHED_USERS';

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

/* Request matched users */
export function failMatchedUsersRequest(error) {
  return {
    error,
    type: FAIL_MATCHED_USERS_REQUEST,
  };
}

export function requestMatchedUsers() {
  return {
    type: REQUEST_MATCHED_USERS,
  };
}

export function updateMatchedUsers(matchedUsers) {
  return {
    matchedUsers,
    type: UPDATE_MATCHED_USERS,
  };
}

/* Chat with user screen */
export function chatWithUser(userIndex) {
  return {
    userIndex,
    type: CHAT_WITH_USER,
  };
}
