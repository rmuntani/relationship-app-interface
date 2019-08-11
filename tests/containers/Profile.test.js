import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { relationship } from '../../src/reducers';
import { Profile } from '../../src/containers/Profile';

describe('Profile', () => {
  afterEach(cleanup);

  const ProfileWithStore = (extraImages = {}) => {
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
      ...extraImages,
    }];
    const userIndex = 1;

    const state = {
      consultAPI: {
        data: users,
        error: 'It\'s an error',
        success: true,
        userIndex,
      },
      profileInteraction: {
        imageIndex: 0,
        showDescription: false,
      },
      match: {
        open: false,
        user: matchUser,
      },
    };

    const store = createStore(relationship, state);

    return (
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  };

  it('should toggle profile description with an image click', () => {
    const { container, getByText, queryByText } = render(<ProfileWithStore />);
    const image = container.querySelector('img[src*=\'bush.jpg\']');

    expect(queryByText(/Former US President/)).toBe(null);

    fireEvent.click(image);

    getByText(/Former US President/);
  });

  it('should show other pictures, eventually looping to the first one, when further clicks are done', () => {
    const extraImages = {
      images: [
        {
          alt: 'Literally me',
          src: 'image1.jpg',
        },
        {
          alt: 'Me and my dog',
          src: 'image2.jpg',
        },
        {
          alt: 'My horse',
          src: 'image3.jpg',
        },
        {
          alt: 'ME DANCING',
          src: 'image4.jpg',
        },
        {
          alt: 'M.e.',
          src: 'image5.jpg',
        },
      ],
    };

    const { getByAltText } = render(<ProfileWithStore {...extraImages} />);
    let clickableImage = getByAltText('Literally me');

    extraImages.images.forEach((image) => {
      fireEvent.click(clickableImage);
      clickableImage = getByAltText(image.alt);
    });

    fireEvent.click(clickableImage);
    getByAltText('Literally me');
  });
});
