/* Action types */

export const FAIL_REQUEST = 'FAIL_REQUEST';
export const REQUEST_USERS = 'REQUEST_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER';

export const CLOSE_MATCH = 'CLOSE_MATCH';
export const SHOW_MATCH = 'SHOW_MATCH';

export const CHANGE_CURRENT_IMAGE = 'CHANGE_CURRENT_IMAGE';
export const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION';

/* Action creator */

/* Users API */
export function failRequest(error) {
  return {
    error,
    type: FAIL_REQUEST,
  };
}

export function requestUsers() {
  return {
    type: REQUEST_USERS,
  };
}

export function updateUsers(data) {
  return {
    data,
    type: UPDATE_USERS,
  };
}

export function changeCurrentUser(currIndex, numberOfUsers) {
  const newIndex = (numberOfUsers > 0) ? (currIndex + 1) % numberOfUsers : 0;
  return {
    userIndex: newIndex,
    type: CHANGE_CURRENT_USER,
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
