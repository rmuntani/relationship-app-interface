import React from 'react';
import { cleanup, render } from '@testing-library/react';
import MatchModal from '../src/MatchModal';

describe('MatchModal', () => {
  afterEach(cleanup);

  const matchData = {
    name: 'Michael Jackson',
    picture: 'michael.jpg',
    success: true,
  };

  it('should show user profile picture and name', () => {
    const { container, getByText } = render(<MatchModal {...matchData} />);
    const image = container.querySelector('img[src=\'michael.jpg\']');

    getByText('Michael Jackson');
    expect(image.src).toMatch(/michael.jpg/);
  });
});
