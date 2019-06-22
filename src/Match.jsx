import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Profile from './Profile';
import { buttons, request } from './app.config';
import LikeImage from './imgs/like.svg';
import DislikeImage from './imgs/dislike.svg';

export default function Match() {
  const [changeBatch, updateChangeBatch] = useState(true);
  const [users, changeUsers] = useState({});
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

  const getUser = index => users.users[index];

  useEffect(() => {
    if (changeBatch) {
      axios.get(request).then(
        (userData) => { 
          changeUsers({ users: userData, currentUser: 0 });
          updateChangeBatch(false);
        }
      );
    }
  },[]);

  if (changeBatch) {
    return (<div>Tá zuado</div>);
  }

  return (
    <React.Fragment>
      <Profile {
       ...{ 
          images: getUser(users.currentUser).images, 
          description: getUser(users.currentUser).description
        }
      }/>
      <Button {...dislikeProperties} />
      <Button {...likeProperties} />
    </React.Fragment>
  );
}
