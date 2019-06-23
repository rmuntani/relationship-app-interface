import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Profile from './Profile';
import { dislikeButton, likeButton, match, request } from './app.config';
import LikeImage from './imgs/like.svg';
import DislikeImage from './imgs/dislike.svg';

export default function Match() {
  const [changeBatch, updateChangeBatch] = useState(true);
  const [users, changeUsers] = useState({});

  const getUser = index => users.users[index];
  const setNextUser = () => {
    const nextUser = users.currentUser + 1;
    changeUsers({ ...users, currentUser: nextUser });
  };

  const dislike = () => {
    axios.post(request.dislike, { id: getUser(users.currentUser).id });
    setNextUser();
  };
  const like = () => {
    axios.post(request.like, { id: getUser(users.currentUser).id });
    setNextUser();
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

  if (changeBatch) {
    return (<div>Loading...</div>);
  }

  return (
    <div style={{...match.style}}>
      <Profile {
       ...{
         images: getUser(users.currentUser).images,
         description: getUser(users.currentUser).description,
       }
     }
      />
      <Button {...dislikeProperties} />
      <Button {...likeProperties} />
    </div>
  );
}
