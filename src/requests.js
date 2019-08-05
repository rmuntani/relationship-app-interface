import axios from 'axios';
import {
  failRequest, requestUsers, updateUsers,
  showMatch, changeCurrentUser,
} from './actions';
import { request } from './configs/app.config';
import { errors } from './configs/app.text';

export function getRecomendations() {
  return function (dispatch) {
    dispatch(requestUsers());

    axios
      .get(request.base)
      .then(
        (response) => {
          if (response.status < 300) {
            dispatch(updateUsers(response.data));
          } else {
            dispatch(failRequest(errors.internal));
          }
        },
      )
      .catch(
        () => { dispatch(failRequest(errors.network)); },
      );
  };
}

function postUser(url, id, currentUser, numberOfUsers) {
  return function (dispatch) {
    dispatch(changeCurrentUser(currentUser, numberOfUsers));

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
