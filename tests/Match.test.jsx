import React from 'react';
import Match from '../src/Match';
import axios from 'axios'
import { cleanup, render } from '@testing-library/react';

jest.mock('axios');

describe('Match', () => {
  afterEach(cleanup);

  it('should receive other users data and show it', done => {
    const usersData = [
      { 
        images: [{
          src: 'ernesto.jpg', 
          alt: 'Ernesto at the beach',
        }], 
        description: {
          name: 'Ernesto Guevara',
          text: 'I\'m a warrior',
        },
      },
    ];

    axios.get.mockResolvedValue(usersData);
    const { container, getByText } = render(<Match />);

    setImmediate(() => {
      const image = container.querySelector('img[src=\'ernesto.jpg\']');
      expect(image.alt).toEqual('Ernesto at the beach');
      getByText('Ernesto Guevara');
      getByText('I\'m a warrior');
      done();
    });
  });
});
