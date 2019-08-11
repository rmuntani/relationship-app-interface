import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Profile from '../../src/components/Profile';

describe('Profile', () => {
  afterEach(cleanup);

  const props = {
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
    imageClick: jest.fn(),
    imageIndex: 0,
    showDescription: false,
  };

  it('should have a clickable image that will trigger all state changes', () => {
    const { getByAltText } = render(<Profile {...props} />);
    const image = getByAltText('Michael Schumacher');

    fireEvent.click(image);

    expect(props.imageClick).toHaveBeenCalledTimes(1);
  });

  it('should show an image', () => {
    const { getByAltText } = render(<Profile {...props} />);
    const image = getByAltText('Michael Schumacher');

    expect(image.src).toMatch(/ms\.jpg/);
  });

  it('should show the user description, with age and name', () => {
    const { getByText } = render(<Profile {...props} />);

    getByText(/Michael Schumacher, 50/);
  });

  it('should not show user text when a flag is not set', () => {
    const { queryByText } = render(<Profile {...props} />);

    expect(queryByText(/Rolling around at the speed of sound./)).toBe(null);
  });

  it('should show user text when a flag is set', () => {
    const propsWithFlagSet = { ...props, showDescription: true };
    const { getByText } = render(<Profile {...propsWithFlagSet} />);

    getByText(/Rolling around at the speed of sound./);
  });

  it('should show an image of the array according to a props index', () => {
    const propsWithIndex1 = { ...props, imageIndex: 1 };
    const { getByAltText, queryByAltText } = render(<Profile {...propsWithIndex1} />);
    const image = getByAltText(/Michael skiing/);
    const missingImage = queryByAltText(/Michael Schumacher/);

    expect(image.src).toMatch(/mski.jpg/);
    expect(missingImage).toBe(null);
  });
});
