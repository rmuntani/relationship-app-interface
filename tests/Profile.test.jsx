import React from 'react';
import {
  cleanup, fireEvent, render,
} from '@testing-library/react';
import Profile from '../src/Profile';

describe('Profile', () => {
  afterEach(cleanup);

  const user = {
    id: 1,
    images: [{ alt: 'Michael Schumacher', src: 'michael.jpg' }],
    description: {
      age: 50,
      name: 'Michael Schumacher',
      text: 'Rolling around at the speed of sound.',
    },
  };

  const otherUser = {
    id: 2,
    images: [{ alt: 'Michael Jackson', src: 'mj.jpg' }],
    description: {
      age: 50,
      name: 'Michael Jackson',
      text: 'Who is bad (not me)',
    },
  };

  it('image click should toggle profile description', () => {
    const { container, getByText } = render(<Profile {...user} />);
    const image = container.querySelector('img[src*=\'michael.jpg\']');

    fireEvent.click(image);

    getByText('Rolling around at the speed of sound.');
  });

  it('profile data change should hide description text', () => {
    const { container, queryByText, rerender } = render(<Profile {...user} />);
    const image = container.querySelector('img[src*=\'michael.jpg\']');

    fireEvent.click(image);
    rerender(<Profile {...otherUser} />);

    expect(queryByText(/Who is bad \(not me\)/)).toBe(null);
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
    const userWithImages = { ...user, ...extraImages };
    const { getByAltText } = render(<Profile {...userWithImages} />);
    let clickableImage = getByAltText('Literally me');

    extraImages.images.forEach((image) => {
      fireEvent.click(clickableImage);
      clickableImage = getByAltText(image.alt);
    });

    fireEvent.click(clickableImage);
    getByAltText('Literally me');
  });
});
