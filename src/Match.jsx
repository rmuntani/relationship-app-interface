import axios from 'axios';
import React, { useEffect, useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Button from './Button';
import Profile from './Profile';
import {
  dislikeButton, likeButton, match, modal,
  request, shade,
} from './app.config';
import LikeImage from './imgs/like.svg';
import DislikeImage from './imgs/dislike.svg';
import MatchModal from './MatchModal';


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
    if (changeBatch) {
      axios.get(request.base)
        .then(
          (response) => {
            if (response.status === 200) {
              changeUsers({ users: response.data, currentUser: 0 });
              updateChangeBatch(false);
            }
          },
        )
        .catch(
          () => {
            updateChangeBatch(true);
          },
        );
    }
  }, []);

  const matchRoot = component => <div style={{ ...match.style }}>{component}</div>;

  const matchModal = () => ([
    <Modal key="modal" style={{ ...modal.style }}>
      <MatchModal {...{ ...isMatch.user, click: removeMatch }} />
    </Modal>,
    <Shade key="shade" style={{ ...shade.style }} />,
  ]
  );

  if (changeBatch) {
    return (matchRoot(<div>Loading...</div>));
  }

  return (
    matchRoot(
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
    )
  );
}
