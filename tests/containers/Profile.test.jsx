import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { relationship } from '../../src/reducers';
import { Profile } from '../../src/containers/Profile';

describe('Profile', () => {
  afterEach(cleanup);

  const ProfileWithStore = (props = {}) => {
    const store = createStore(relationship);
    const extraProps = {
      description: {
        age: 50,
        name: 'Michael Schumacher',
        text: 'Rolling around at the speed of sound.',
      },
      images: [{
        alt: 'Michael Schumacher',
        src: 'ms.jpg',
      },
      {
        alt: 'Michael skiing',
        src: 'mski.jpg',
      }],
      ...props,
    };

    return (
      <Provider store={store}>
        <Profile {...extraProps} />
      </Provider>
    );
  };

  const otherUser = {
    images: [{ alt: 'Michael Jackson', src: 'mj.jpg' }],
    description: {
      age: 50,
      name: 'Michael Jackson',
      text: 'Who is bad (not me)',
    },
  };

  it('image click should toggle profile description', () => {
    const { container, getByText } = render(<ProfileWithStore />);
    const image = container.querySelector('img[src*=\'ms.jpg\']');

    fireEvent.click(image);

    getByText('Rolling around at the speed of sound.');
  });

  it('profile data change should hide description text', () => {
    const { container, queryByText, rerender } = render(<ProfileWithStore />);
    const image = container.querySelector('img[src*=\'ms.jpg\']');

    fireEvent.click(image);
    rerender(<ProfileWithStore {...otherUser} />);

    expect(queryByText(/Who is bad \(not me\)/)).toBe(null);
    throw (new Error('Images were not implemented'));
  });

  it('further clicks should show other pictures, eventually looping to the first one', () => {
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
