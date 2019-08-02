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

const defaultMessageStyle = {
  border: 'solid 1px gray',
  borderRadius: '20px',
  display: 'block',
  margin: '10px',
  padding: '5px',
  width: '140px',
  wordWrap: 'break-word',
};

const margin = '50px';

export const app = {
  style: {
    border: 'solid 1px gray',
    margin: 'auto',
    height: '500px',
    width: '300px',
  },
};

export const chatList = {
  style: {
    margin: '0px',
    padding: '0px',
    listStyle: 'none',
  },
};

export const chatListItem = {
  style: {
    border: 'solid 1px gray',
    height: '50px',
    padding: '5px',
  },
};

export const chatListUsername = {
  style: {
    marginLeft: '20%',
    marginTop: '15px',
  },
};

export const chatPicture = {
  style: {
    float: 'left',
    height: '50px',
    width: '50px',
  },
};

export const currentUserMessage = {
  style: {
    ...defaultMessageStyle,
    marginRight: 'auto',
    textAlign: 'left',
  },
};

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

export const navigationBar = {
  style: {
    height: '18px',
    margin: 'auto',
    width: '300px',
  },
};

export const navigationButton = {
  style: {
    border: 'solid 1px gray',
    background: 'black',
    color: 'white',
    padding: '0px',
    height: '18px',
    width: '150px',
  },
};

export const otherUserMessage = {
  style: {
    ...defaultMessageStyle,
    marginLeft: 'auto',
    textAlign: 'right',
  },
};

export const messageButton = {
  style: {
    width: 'auto',
  },
};

export const messageInput = {
  style: {
    width: '200px',
  },
};

export const messageList = {
  style: {
    listStyle: 'none',
    padding: '0px',
  },
};

export const messageScreen = {
  style: {
    height: '450px',
    position: 'relative',
  },
};

export const messageScreenInputs = {
  style: {
    bottom: '30px',
    position: 'absolute',
    width: '300px',
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

export const CURRENT_USER = 0;

export const request = {
  base: 'http://localhost:4567/suggestions',
  dislike: 'http://localhost:4567/dislike',
  like: 'http://localhost:4567/like',
  matches: id => `http://localhost:4567/user/${id}/matches`,
};

export const webSocketConfig = {
  server: 'ws://127.0.0.1:1337',
};
