import React from 'react';
import Button from './Button';
import Profile from './Profile';
import { buttons } from './app.config';
import LikeImage from './imgs/like.svg';
import DislikeImage from './imgs/dislike.svg';

export default function Match() {
  const dislike = () => {};
  const like = () => {};
  const likeProperties = {
    click: like,
    image: {
      alt: 'Like button',
      src: LikeImage,
    },
    keysDown: buttons.right,
  };
  const dislikeProperties = {
    click: dislike,
    image: {
      alt: 'Dislike button',
      src: DislikeImage,
    },
    keysDown: buttons.left,
  };

  return (
    <React.Fragment>
      <Profile />
      <Button {...dislikeProperties} />
      <Button {...likeProperties} />
    </React.Fragment>
  );
}
