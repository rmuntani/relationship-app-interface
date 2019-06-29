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

const margin = '50px';

export const dislikeButton = {
  keys: [39, 68],
  style: {
    buttonStyle: {
      ...baseLikeButton,
      marginLeft: margin,
    },
    imageStyle: {
      ...baseLikeButton,
    },
  },
  text: 'Dislike button',
};

export const likeButton = {
  keys: [37, 65],
  style: {
    buttonStyle: {
      ...baseLikeButton,
      float: 'right',
      marginRight: margin,
    },
    imageStyle: {
      ...baseLikeButton,
    },
  },
  text: 'Like button',
};

export const match = {
  style: {
    border: 'solid 1px gray',
    margin: 'auto',
    height: '500px',
    width: '300px',
  },
};

export const modal = {
  style: {
    background: 'white',
    borderRadius: '10px',
    height: '500px',
    position: 'absolute',
    width: '300px',
    zIndex: '1',
  },
};

export const profile = {
  style: {
    height: '425px',
    margin: 'auto',
    textAlign: 'center',
  },
};

export const profileName = {
  style: {
    backgroundColor: 'black',
    bottom: '3px',
    color: 'white',
    opacity: '0.7',
    padding: '0px',
    position: 'absolute',
    width: '100%',
  },
};

export const profileDescription = {
  style: {
    height: '125px',
    overflow: 'scroll',
  },
};

export const profilePictureImage = {
  style: {
    height: '400px',
    width: '300px',
  },
};

export const profilePicture = {
  style: {
    ...neutralButton,
    ...profilePictureImage,
    padding: '0px',
    position: 'relative',
  },
};

export const request = {
  base: 'http://localhost:4567/suggestions',
  dislike: 'http://localhost:4567/dislike',
  like: 'http://localhost:4567/like',
};

export const shade = {
  style: {
    background: 'rgba(0, 0, 0, 0.8)',
    bottom: '0',
    left: '0',
    position: 'absolute',
    right: '0',
    top: '0',
  },
};
