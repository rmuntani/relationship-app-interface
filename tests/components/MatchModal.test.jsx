import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import MatchModal from '../../src/components/MatchModal';

describe('MatchModal', () => {
  afterEach(cleanup);

  const matchData = {
    closeModal: jest.fn(),
    user: {
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'It\'s me, Paulo',
        src: 'paulo.jpg',
      },
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
    const matchWithoutImage = {...matchData};
    matchWithoutImage.user.image = { src: 'paulo.jpg' };

    const { container, getByText } = render(<MatchModal {...matchWithoutImage} />);
    const image = container.querySelector('img[src=\'paulo.jpg\']');

    getByText(/Paulo Freire/);
    expect(image.src).toMatch(/paulo.jpg/);
    expect(image.alt).toMatch(/Paulo Freire/);
  });

  it('should call closeModal function when it\'s clicked or a key is pressed', () => {
    const { container } = render(<MatchModal {...matchData} />);
    const image = container.querySelector('img[src=\'paulo.jpg\']');

    fireEvent.click(image);

    expect(matchData.closeModal).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(image, { key: 'ArrowLeft', keyCode: 37, which: 37 });

    expect(matchData.closeModal).toHaveBeenCalledTimes(2);
  });
});
