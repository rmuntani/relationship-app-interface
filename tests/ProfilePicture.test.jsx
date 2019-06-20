import React from 'react';
import {
  cleanup, fireEvent, render,
} from '@testing-library/react';
import ProfilePicture from '../src/ProfilePicture';

describe('ProfilePicture', () => {
  afterEach(cleanup);

  it('should not change when there is only one image', () => {
    const data = { images: [{ alt: 'No image', src: 'test1' }] };
    const { container } = render(<ProfilePicture {...data} />);
    const image = container.querySelector('img');
    const button = container.querySelector('button');

    expect(image.src).toMatch(/test1/);
    fireEvent.click(button);

    const updatedImage = container.querySelector('img');
    expect(updatedImage.src).toMatch(/test1/);
  });

  it('should change when clicked', () => {
    const data = {
      images: [
        { alt: 'No image', src: 'test1' },
        { alt: 'No image', src: 'test2' },
      ],
    };
    const { container } = render(<ProfilePicture {...data} />);
    const image = container.querySelector('img');
    const button = container.querySelector('button');

    expect(image.src).toMatch(/test1/);
    fireEvent.click(button);

    const updatedImage = container.querySelector('img');
    expect(updatedImage.src).toMatch(/test2/);
  });

  it('should render all possible images, then return to the first', () => {
    const imagesList = [
      { alt: 'No image', src: 'test1' },
      { alt: 'No image', src: 'test2' },
      { alt: 'No image', src: 'test3' },
      { alt: 'No image', src: 'test4' },
      { alt: 'No image', src: 'test5' },
    ];
    const data = { images: imagesList };
    const { container } = render(<ProfilePicture {...data} />);
    const button = container.querySelector('button');

    imagesList.forEach((item) => {
      container.querySelector('img');
      expect(container.querySelector('img').src).toMatch(new RegExp(item));
      fireEvent.click(button);
    });

    expect(container.querySelector('img').src).toMatch(/test1/);
  });
});
