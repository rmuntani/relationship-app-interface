import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ChatItem from '../../src/components/ChatItem';

describe('ChatItem', () => {
  afterEach(cleanup);

  it('should render a default image if original image is not available', (done) => {
    const lackingImage = {
      id: 1,
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'It\'s me, Paulo',
        src: null,
      },
    };
    const { findByAltText, getByText } = render(<ChatItem user={lackingImage} />);

    findByAltText(/It's me, Paulo/)
      .then(
        (image) => {
          fireEvent.error(image);

          expect(image.src).not.toEqual('paulo.jpg');
          getByText(/Paulo Freire/);
          getByText(/75/);

          done();
        },
      )
      .catch(
        () => { throw (new Error('Image not found')); },
      );
  });
});
