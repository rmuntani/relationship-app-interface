const matchUser = {
  age: 75,
  name: 'Paulo Freire',
  image: {
    alt: 'Paulo, the educator',
    src: 'paulo.jpg',
  },
};

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

export const mockState = (consultAPI = {}, profileInteraction = {}, match = {}) => ({
  consultAPI: {
    suggestions: users,
    error: 'It\'s an error',
    success: true,
    userIndex: 1,
    ...consultAPI,
  },
  profileInteraction: {
    imageIndex: 0,
    showDescription: false,
    ...profileInteraction,
  },
  match: {
    open: false,
    user: matchUser,
    ...match,
  },
});

export const mockWithExtraImages = (extraImages) => {
  const userWithImages = { suggestions: users.map(user => { return { ...user, ...extraImages } }) };
  return mockState(userWithImages);
};

export const mockBeforeAPICall = () => {
  const consultAPI = {
    suggestions: [],
    error: '',
    success: null,
    userIndex: 0,
  };

  return mockState(consultAPI);
}
