import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Button from '../../src/components/Button';
import { likeButton } from '../../src/configs/app.config';

describe('Button', () => {
  afterEach(cleanup);

  it('should call the received function', () => {
    const functionTest = { click: jest.fn() };
    const { container } = render(<Button {...functionTest} />);
    const button = container.querySelector('button');

    fireEvent.click(button);

    expect(functionTest.click).toHaveBeenCalledTimes(1);
  });

  it('should support accessibility', () => {
    const properties = {
      click: jest.fn(),
      keysDown: likeButton.keys,
    };
    const { container } = render(<Button {...properties} />);
    const button = container.querySelector('button');

    // Wrong key doesn't trigger effect
    fireEvent.keyDown(button, { key: 'Enter', code: 13 });
    expect(properties.click).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(button, { key: 'ArrowLeft', keyCode: 37, which: 37 });
    expect(properties.click).toHaveBeenCalledTimes(1);
  });
});
