import { mapStateToProfileProps, mapStateToMatchProps } from '../src/selectors';

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

it('should use mapStateToMatchProsp successfully', () => {
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
