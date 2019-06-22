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
      alt: buttons.likeText,
      src: LikeImage,
    },
    keysDown: buttons.right,
  };
  const dislikeProperties = {
    click: dislike,
    image: {
      alt: buttons.dislikeText,
      src: DislikeImage,
    },
    keysDown: buttons.left,
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
        (response) => {
          updateChangeBatch(true);
        },
      )
    }
  }, []);

  if (changeBatch) {
    return (<div>Loading...</div>);
  }

  return (
    <React.Fragment>
      <Profile {
       ...{
         images: getUser(users.currentUser).images,
         description: getUser(users.currentUser).description,
       }
     }
      />
      <Button {...dislikeProperties} />
      <Button {...likeProperties} />
    </React.Fragment>
  );
}
