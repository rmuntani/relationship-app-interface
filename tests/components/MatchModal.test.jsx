import React from 'react';
import { cleanup, render } from '@testing-library/react';
import MatchModal from '../../src/components/MatchModal';

describe('MatchModal', () => {
  afterEach(cleanup);

  const matchData = {
    id: 1,
    age: 75,
    name: 'Paulo Freire',
    image: {
      alt: 'It\'s me, Paulo',
      src: 'paulo.jpg',
    },
  };

  it('should show user profile picture and name', () => {
    const { container, getByText } = render(<MatchModal {...matchData} />);
    const image = container.querySelector('img[src=\'paulo.jpg\']');

    getByText(/Paulo Freire/);
    expect(image.src).toMatch(/paulo.jpg/);
    expect(image.alt).toMatch(/It's me, Paulo/);
  });

  it('should render alt regardless of lack of alt', () => {
    const imageWithoutAlt = { image: { src: 'paulo.jpg' } };
    const dataWithoutAlt = { ...matchData, ...imageWithoutAlt };
    const { container, getByText } = render(<MatchModal {...dataWithoutAlt} />);
    const image = container.querySelector('img[src=\'paulo.jpg\']');

    getByText(/Paulo Freire/);
    expect(image.src).toMatch(/paulo.jpg/);
    expect(image.alt).toMatch(/Paulo Freire/);
  });
});
