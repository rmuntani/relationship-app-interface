import { mount } from 'enzyme';
import React from 'react';
import Button from '../src/Button';
import { buttons } from '../src/app.config';

describe('Button', () => {
  it('should call the received function', () => {
    const functionTest = {
      click: jest.fn(),
    };
    const button = mount(<Button {...functionTest} />);
    button.childAt(0).prop('onClick')();

    expect(functionTest.click).toHaveBeenCalledTimes(1);
  });

  it('should support accessibility', () => {
    const properties = {
      click: jest.fn(),
      keysDown: buttons.left,
    };
    const button = mount(<Button {...properties} />);
    button.childAt(0).simulate('keyPress', { key: 'ArrowLeft', keyCode: 37, which: 37 });

    expect(properties.click).toHaveBeenCalledTimes(1);
  });
});
