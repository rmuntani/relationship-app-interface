import axios from 'axios';
import React, { useEffect, useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Button from './Button';
import Profile from './Profile';
import {
  app, dislikeButton, likeButton, modal,
  request, shade,
} from './app.config';
import LikeImage from './imgs/like.svg';
import DislikeImage from './imgs/dislike.svg';
import MatchModal from './MatchModal';
import { errors, loading } from './app.text';

const Modal = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 200 },
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default function Match() {
  const [changeBatch, updateChangeBatch] = useState(true);
  const [users, changeUsers] = useState({});
  const [isMatch, setMatch] = useState({ success: false, user: {} });
  const [networkProblems, setNetworkProblems] = useState(false);
  const [internalProblems, setInternalProblems] = useState(false);
  const getUser = index => users.users[index];

  const setNextUser = () => {
    const nextUser = users.currentUser + 1;
    changeUsers({ ...users, currentUser: nextUser });
  };

  const processMatch = (response) => {
    const { success, user } = response.data;
    if (success) {
      setMatch({ success, user });
    }
  };

  const dislike = () => {
    axios
      .post(request.dislike, { id: getUser(users.currentUser).id })
      .then(response => processMatch(response));
    setNextUser();
  };

  const like = () => {
    axios
      .post(request.like, { id: getUser(users.currentUser).id })
      .then(response => processMatch(response));
    setNextUser();
  };

  const removeMatch = () => {
    setMatch({ success: false, user: {} });
  };

  const likeProperties = {
    click: like,
    image: {
      alt: likeButton.text,
      src: LikeImage,
    },
    keysDown: likeButton.keys,
    style: likeButton.style,
  };

  const dislikeProperties = {
    click: dislike,
    image: {
      alt: dislikeButton.text,
      src: DislikeImage,
    },
    keysDown: dislikeButton.keys,
    style: dislikeButton.style,
  };

  useEffect(() => {
    axios.get(request.base)
      .then(
        (response) => {
          if (response.status < 300) {
            changeUsers({ users: response.data, currentUser: 0 });
            updateChangeBatch(false);
          } else {
            setInternalProblems(true);
          }
        },
      )
      .catch(
        () => {
          setNetworkProblems(true);
        },
      );
  }, []);

  const matchRoot = component => <div style={{ ...app.style }}>{component}</div>;

  const matchModal = () => ([
    <Modal key="modal" style={{ ...modal.style }}>
      <MatchModal {...{ ...isMatch.user, click: removeMatch }} />
    </Modal>,
    <Shade key="shade" style={{ ...shade.style }} />,
  ]
  );

  if (internalProblems) {
    return (
      matchRoot(
        <div>
          {errors.internal}
        </div>,
      )
    );
  }

  if (networkProblems) {
    return (matchRoot(<div>{errors.network}.</div>));
  }

  if (changeBatch) {
    return (matchRoot(<div>{loading}</div>));
  }

  return (
    <React.Fragment>
      {matchRoot(
        <React.Fragment>
          <PoseGroup>
            {isMatch.success && matchModal()}
          </PoseGroup>
          <Profile {
          ...{
            images: getUser(users.currentUser).images,
            description: getUser(users.currentUser).description,
          }
          }
          />
          <Button {...dislikeProperties} />
          <Button {...likeProperties} />
        </React.Fragment>,
      )}
    </React.Fragment>
  );
}
