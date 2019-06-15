import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ProfilePicture from '../src/ProfilePicture';

// This test uses React's test-utils, because Enzyme doesn't support
// hooks as of 06.2019
describe('ProfilePicture', () => {
  const clickOn = (image) => {
    act(() => {
      image.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  };
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should not change when there is only one image', () => {
    const data = { images: ['test1'] };

    act(() => {
      ReactDOM.render(<ProfilePicture {...data} />, container);
    });

    const image = container.querySelector('img');

    expect(image.src).toMatch(/test1/);
    clickOn(image);
    expect(image.src).toMatch(/test1/);
  });

  it('should changes when clicked', () => {
    const data = { images: ['test1', 'test2'] };

    act(() => {
      ReactDOM.render(<ProfilePicture {...data} />, container);
    });

    const image = container.querySelector('img');

    expect(image.src).toMatch(/test1/);
    clickOn(image);
    expect(image.src).toMatch(/test2/);
  });

  it('should render all possible images, then return to the first', () => {
    const imagesList = ['test1', 'test2', 'test3', 'test4', 'test5'];
    const data = { images: imagesList };

    act(() => {
      ReactDOM.render(<ProfilePicture {...data} />, container);
    });

    const image = container.querySelector('img');
    imagesList.forEach((item) => {
      expect(image.src).toMatch(new RegExp(item));
      clickOn(image);
    });

    expect(image.src).toMatch(/test1/);
  });
});
