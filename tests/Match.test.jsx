import { mount } from 'enzyme';
import React from 'react';
import Match from '../src/Match';

describe('Match', () => {
  it('should have two buttons and a profile', () => {
    const matchScreen = mount(<Match />);
    const buttons = matchScreen.find('Button');
    const profile = matchScreen.find('Profile');

    expect(buttons.length).toEqual(2);
    expect(profile.length).toEqual(1);
  });
});
