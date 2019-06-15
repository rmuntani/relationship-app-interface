import { mount } from 'enzyme';
import React from 'react';
import Profile from '../src/Profile';

describe('Profile', () => {
  it('should have a picture and a description', () => {
    const profile = mount(<Profile />);
    const picture = profile.find('ProfilePicture');
    const description = profile.find('ProfileDescription');

    expect(picture.length).toEqual(1);
    expect(description.length).toEqual(1);
  });
});
