import axios from 'axios';
import {
  failSuggestions, requestSuggestions, updateSuggestions,
  showMatch, changeCurrentSuggestion, requestMatchedUsers,
  updateMatchedUsers, failMatchedUsersRequest,
} from './actions';
import { request } from './configs/app.config';
import { errors } from './configs/app.text';

// Match
export function getRecomendations() {
  return function (dispatch) {
    dispatch(requestSuggestions());

    axios
      .get(request.base)
      .then(
        (response) => {
          if (response.status < 300) {
            dispatch(updateSuggestions(response.data));
          } else {
            dispatch(failSuggestions(errors.internal));
          }
        },
      )
      .catch(
        () => { dispatch(failSuggestions(errors.network)); },
      );
  };
}

function postUser(url, id, currentUser, numberOfUsers) {
  return function (dispatch) {
    dispatch(changeCurrentSuggestion(currentUser, numberOfUsers));

    axios
      .post(url, { id })
      .then((response) => {
        const { data } = response;
        const { success, user } = data;

        if (success) {
          dispatch(showMatch(user));
        }
      });
  };
}

export function dislikeUser(id, currentUser, numberOfUsers) {
  return postUser(request.dislike, id, currentUser, numberOfUsers);
}

export function likeUser(id, currentUser, numberOfUsers) {
  return postUser(request.like, id, currentUser, numberOfUsers);
}

// Chat
export function getMatchedUsers() {
  return function (dispatch) {
    dispatch(requestMatchedUsers());

    axios
      .get(request.matches(1))
      .then((response) => {
        if (response.status < 300) {
          dispatch(updateMatchedUsers(response.data));
        } else {
          dispatch(failMatchedUsersRequest(errors.internal));
        }
      })
      .catch(() => {
        dispatch(failMatchedUsersRequest(errors.network));
      });
  };
}
