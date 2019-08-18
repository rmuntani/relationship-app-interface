import {
  mapStateToProfileProps, mapStateToMatchProps,
  mapStateToChatSelectionProps,
  mapStateToChatProps,
  mapStateToChatScreenProps,
} from '../src/selectors';

const users = [{
  id: 1,
  images: [{
    src: 'ernesto.jpg',
    alt: 'Ernesto at the beach',
  }],
  description: {
    age: 39,
    name: 'Ernesto Guevara',
    text: 'I\'m a warrior',
  },
},
{
  id: 2,
  images: [{
    src: 'bush.jpg',
    alt: 'George grilling some meat',
  }],
  description: {
    age: 72,
    name: 'George Bush',
    text: 'Former US President',
  },
}];

const matchUser = {
  age: 75,
  name: 'Paulo Freire',
  image: {
    alt: 'Paulo, the educator',
    src: 'paulo.jpg',
  },
};

const userIndex = 1;

const state = {
  consultAPI: {
    suggestions: users,
    error: 'It\'s an error',
    success: true,
    userIndex,
  },
  profileInteraction: {
    imageIndex: 0,
    showDescription: false,
  },
  match: {
    open: true,
    user: matchUser,
  },
  chat: {
    error: 'Wrong...',
    matchedUsers: [
      { id: 4, name: 'Robert Smith' },
      { id: 3, name: 'Bart Simpson' },
    ],
    success: true,
    userIndex: 4,
  },
  messages: {
    4: [
      { id: 4, message: 'Hello!' },
      { id: -1, message: '?' },
    ],
    5: [
      { id: 5, message: 'YOU AGAIN?' },
    ],
  },
};

it('should use mapStateToProfileProps successfully', () => {
  const profileProps = {
    description: users[userIndex].description,
    images: users[userIndex].images,
    imageIndex: 0,
    showDescription: false,
  };

  expect(mapStateToProfileProps(state)).toEqual(profileProps);
});

it('should use mapStateToMatchProps successfully', () => {
  const matchProps = {
    error: 'It\'s an error',
    matchUser,
    openMatch: true,
    success: true,
    users,
    userIndex: 1,
  };

  expect(mapStateToMatchProps(state)).toEqual(matchProps);
});

it('should use mapStateToChatSelectionProps successfully', () => {
  const chatSelectionProps = {
    error: 'Wrong...',
    users: [
      { id: 4, name: 'Robert Smith' },
      { id: 3, name: 'Bart Simpson' },
    ],
    success: true,
  };

  expect(mapStateToChatSelectionProps(state)).toEqual(chatSelectionProps);
});

it('should use mapStateToChatProps successfully', () => {
  const chatProps = {
    chatWith: 4,
  };

  expect(mapStateToChatProps(state)).toEqual(chatProps);
});

it('should use mapStateToChatScreenProps successfully', () => {
  const chatScreenProps = {
    messages: [
      { id: 4, message: 'Hello!' },
      { id: -1, message: '?' },
    ],
    user: { id: 4, name: 'Robert Smith' },
  };

  expect(mapStateToChatScreenProps(state)).toEqual(chatScreenProps);
});
