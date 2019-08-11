import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Button from './Button';
import Profile from '../containers/Profile';
import {
  app, dislikeButton, likeButton, modal,
  shade,
} from '../configs/app.config';
import LikeImage from '../imgs/like.svg';
import DislikeImage from '../imgs/dislike.svg';
import MatchModal from './MatchModal';
import { loading } from '../configs/app.text';

const Modal = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 200 },
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default function Match({
  closeModal, dislikeUser,
  error, hideDescription,
  likeUser, matchUser,
  openMatch, requestUsers,
  success, users,
  userIndex,
}) {
  const dislike = () => {
    dislikeUser(users[userIndex].id, userIndex, users.length);
  };

  const like = () => {
    likeUser(users[userIndex].id, userIndex, users.length);
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
    requestUsers();
  }, []);

  useEffect(() => {
    hideDescription();
  }, [userIndex]);

  const matchRoot = component => <div style={{ ...app.style }}>{component}</div>;

  const matchModal = () => ([
    <Modal key="modal" style={{ ...modal.style }}>
      <MatchModal user={matchUser} closeModal={closeModal} />
    </Modal>,
    <Shade key="shade" style={{ ...shade.style }} />,
  ]
  );

  if (success === null) {
    return (matchRoot(<div>{loading}</div>));
  }

  if (!success) {
    return (
      matchRoot(
        <div>{error}</div>,
      )
    );
  }

  return (
    <React.Fragment>
      {matchRoot(
        <React.Fragment>
          <PoseGroup>
            {openMatch && matchModal()}
          </PoseGroup>
          <Profile />
          <Button {...dislikeProperties} />
          <Button {...likeProperties} />
        </React.Fragment>,
      )}
    </React.Fragment>
  );
}

Match.propTypes = {
  closeModal: PropTypes.func.isRequired,
  dislikeUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  hideDescription: PropTypes.func.isRequired,
  matchUser: PropTypes.shape({
    age: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
    })),
  }),
  likeUser: PropTypes.func.isRequired,
  openMatch: PropTypes.bool.isRequired,
  requestUsers: PropTypes.func.isRequired,
  success: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })).isRequired,
    description: PropTypes.shape({
      age: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  })),
  userIndex: PropTypes.number,
};

Match.defaultProps = {
  error: '',
  matchUser: {},
  success: null,
  users: [],
  userIndex: 0,
};
