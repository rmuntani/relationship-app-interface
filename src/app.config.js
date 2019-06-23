const neutralButton = {
  background: 'none',
  border: 'none',
};

const baseLikeButton = {
  ...neutralButton,
  height: '50px',
  padding: '0px',
  width: '50px',
};

export const dislikeButton = {
  keys: [37, 65],
  style: {
    ...baseLikeButton,
  },
  text: 'Dislike button',
}

export const likeButton = {
  keys: [39, 68],
  style: {
    ...baseLikeButton,
    float: 'right',
  },
  text: 'Like button',
}

export const match = {
  style: {
    border: 'solid 1px blue',
    margin: 'auto',
    height: '500px',
    width: '500px'
  },
};

export const profile = {
  style: {
    margin: 'auto',
    textAlign: 'center',
  }
};

export const profilePicture = {
  style: {
    ...neutralButton,
  },
};

export const request = {
  base: 'http://localhost:4567/suggestions',
  dislike: 'http://localhost:4567/dislike',
  like: 'http://localhost:4567/like',
};
