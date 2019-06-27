import React from 'react';
import { cleanup, render } from '@testing-library/react';
import MatchModal from '../src/MatchModal';

describe('MatchModal', () => {
  afterEach(cleanup);

  const matchData = {
    age: 75,
    name: 'Paulo Freire',
    image: {
      src: 'paulo.jpg',
    },
  };

  it('should show user profile picture and name', () => {
    const { container, getByText } = render(<MatchModal {...matchData} />);
    const image = container.querySelector('img[src=\'paulo.jpg\']');

    getByText('Paulo Freire');
    expect(image.src).toMatch(/paulo.jpg/);
    expect(image.alt).toMatch(/Paulo Freire/);
  });
});
